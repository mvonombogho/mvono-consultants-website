#!/bin/bash
# Mvono Consultants Database Backup Script
#
# Usage: ./backup-database.sh [label]
# Example: ./backup-database.sh pre-release

set -e

# Configuration
BACKUP_DIR="/var/backups/mvono-db"
TIMESTAMP=$(date +"%Y%m%d%H%M%S")
LABEL=${1:-"routine"}
BACKUP_FILE="${BACKUP_DIR}/mvono_db_${LABEL}_${TIMESTAMP}.sql"
LOG_FILE="${BACKUP_DIR}/backup_${TIMESTAMP}.log"
MAX_BACKUPS=14  # Keep 2 weeks of daily backups

# Environment variables for database connection
DB_HOST="localhost"
DB_PORT="5432"
DB_NAME="mvono_db"
DB_USER="mvono_user"

# Load environment-specific variables if available
ENV_FILE="../../.env.production"
if [ -f "$ENV_FILE" ]; then
    source "$ENV_FILE"
    
    # Override with environment variables if defined
    DB_HOST=${DATABASE_HOST:-$DB_HOST}
    DB_PORT=${DATABASE_PORT:-$DB_PORT}
    DB_NAME=${DATABASE_NAME:-$DB_NAME}
    DB_USER=${DATABASE_USER:-$DB_USER}
fi

# Create backup directory if it doesn't exist
mkdir -p "$BACKUP_DIR"

# Log function
log() {
    echo "[$(date +"%Y-%m-%d %H:%M:%S")] $1" | tee -a "$LOG_FILE"
}

log "Starting database backup: $LABEL"
log "Backup file: $BACKUP_FILE"

# Check if pg_dump is available
if ! command -v pg_dump &> /dev/null; then
    log "Error: pg_dump could not be found. Please install PostgreSQL client tools."
    exit 1
fi

# Create the backup
log "Creating database backup..."
if PGPASSWORD="$DB_PASSWORD" pg_dump -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USER" -d "$DB_NAME" -F c -b -v -f "$BACKUP_FILE" > >(tee -a "$LOG_FILE") 2>&1; then
    log "Backup created successfully: $BACKUP_FILE"
    
    # Get backup size
    BACKUP_SIZE=$(du -h "$BACKUP_FILE" | cut -f1)
    log "Backup size: $BACKUP_SIZE"
    
    # Verify backup
    log "Verifying backup integrity..."
    if PGPASSWORD="$DB_PASSWORD" pg_restore -l "$BACKUP_FILE" > /dev/null 2>&1; then
        log "Backup verification successful"
    else
        log "Warning: Backup verification failed. The backup file may be corrupted."
        exit 1
    fi
    
    # Create a compressed copy
    log "Compressing backup..."
    gzip -c "$BACKUP_FILE" > "${BACKUP_FILE}.gz"
    COMPRESSED_SIZE=$(du -h "${BACKUP_FILE}.gz" | cut -f1)
    log "Compressed backup size: $COMPRESSED_SIZE"
    
    # Create symlink to latest backup
    LATEST_LINK="${BACKUP_DIR}/latest_${LABEL}_backup.sql"
    ln -sf "$BACKUP_FILE" "$LATEST_LINK"
    log "Created symlink to latest backup: $LATEST_LINK"
    
    # Clean up old backups
    log "Cleaning up old backups (keeping the $MAX_BACKUPS most recent)..."
    ls -t "${BACKUP_DIR}/mvono_db_${LABEL}_"*.sql | tail -n +$((MAX_BACKUPS+1)) | xargs -r rm
    ls -t "${BACKUP_DIR}/mvono_db_${LABEL}_"*.sql.gz | tail -n +$((MAX_BACKUPS+1)) | xargs -r rm
    
    # Backup successful
    log "Backup process completed successfully"
    exit 0
else
    log "Error: Database backup failed"
    exit 1
fi
