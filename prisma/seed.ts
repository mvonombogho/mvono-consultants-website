import { PrismaClient } from '@prisma/client';
import { hash } from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  try {
    // Create default admin user if it doesn't exist
    const existingAdmin = await prisma.user.findUnique({
      where: {
        email: 'admin@mvonoconsultants.com'
      }
    });

    if (!existingAdmin) {
      console.log('Creating default admin user...');
      await prisma.user.create({
        data: {
          name: 'Admin User',
          email: 'admin@mvonoconsultants.com',
          password: await hash('Admin@123', 10),
          role: 'admin',
        },
      });
      console.log('Default admin user created!');
    } else {
      console.log('Default admin user already exists. Skipping creation.');
    }

    // Create sample services
    const serviceCount = await prisma.service.count();
    if (serviceCount === 0) {
      console.log('Creating sample services...');
      await prisma.service.createMany({
        data: [
          {
            name: 'Environmental Impact Assessment',
            description: 'Comprehensive assessment of environmental impacts for regulatory compliance.',
            category: 'Environmental',
            price: 150000,
          },
          {
            name: 'Occupational Safety Audit',
            description: 'Workplace safety audits and risk assessments for DOSH compliance.',
            category: 'Safety',
            price: 100000,
          },
          {
            name: 'Fire Safety Audit',
            description: 'Thorough evaluation of fire safety measures and emergency protocols.',
            category: 'Safety',
            price: 85000,
          },
          {
            name: 'Energy Audit',
            description: 'Expert analysis of energy consumption patterns and optimization strategies.',
            category: 'Energy',
            price: 120000,
          },
          {
            name: 'Statutory Inspection',
            description: 'Professional inspection of pressure vessels and lifting equipment.',
            category: 'Plant',
            price: 90000,
          },
          {
            name: 'Non-Destructive Testing',
            description: 'Advanced testing methodologies to evaluate material integrity.',
            category: 'Plant',
            price: 110000,
          },
          {
            name: 'Fire Safety Training',
            description: 'Training programs for fire prevention and emergency response.',
            category: 'Training',
            price: 60000,
          },
          {
            name: 'First Aider Training',
            description: 'Training for providing immediate assistance in medical emergencies.',
            category: 'Training',
            price: 50000,
          },
        ],
      });
      console.log('Sample services created!');
    } else {
      console.log('Services already exist. Skipping creation.');
    }

    console.log('Seeding completed successfully.');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
