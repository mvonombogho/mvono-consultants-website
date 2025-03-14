// UI Render Components for ClientStatements
import { MouseEvent, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Search,
  FileText,
  Download,
  Calendar,
  Filter,
  Users,
  Clock,
  Mail,
  Send,
  X,
  ArrowRight,
  Loader2,
  RefreshCcw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export const ClientStatementsUI = ({
  router,
  statements,
  filteredStatements,
  isLoading,
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
  periodFilter,
  setPeriodFilter,
  showFilters,
  setShowFilters,
  activeTab,
  setActiveTab,
  viewStatement,
  isModalOpen,
  selectedStatement,
  closeModal,
  generatePdf,
  sendStatement,
  isSending,
  formatDate,
  formatCurrency,
  getStatusColor,
  calculateAgingSummary,
  toast,
  containerRef,
  filtersRef,
  modalRef,
  modalBackdropRef,
}) => {
  // Animation refs for card interactions
  const cardRefs = useRef([]);

  // Initialize card refs
  useEffect(() => {
    if (!isLoading) {
      cardRefs.current = cardRefs.current.slice(0, filteredStatements.length);
    }
  }, [filteredStatements, isLoading]);

  // Setup card hover animations
  useEffect(() => {
    if (!isLoading && cardRefs.current.length > 0) {
      cardRefs.current.forEach((card, index) => {
        if (!card) return;
        
        // Card entrance animation
        gsap.fromTo(
          card,
          { 
            y: 20, 
            opacity: 0,
            scale: 0.98
          },
          { 
            y: 0, 
            opacity: 1,
            scale: 1,
            duration: 0.6,
            delay: index * 0.1,
            ease: "power2.out",
          }
        );
        
        // Badge animations
        const badges = card.querySelectorAll(".badge-animate");
        badges.forEach((badge) => {
          gsap.fromTo(
            badge,
            { scale: 0.8, opacity: 0 },
            { 
              scale: 1, 
              opacity: 1, 
              duration: 0.3,
              delay: 0.4 + index * 0.1,
              ease: "back.out(1.7)"
            }
          );
        });
        
        // Create hover effect for each card
        const createHoverEffect = (element) => {
          const highlightElements = element.querySelectorAll(".highlight-on-hover");
          const glowElement = element.querySelector(".card-glow");
          
          element.addEventListener("mouseenter", () => {
            gsap.to(element, { 
              y: -5, 
              boxShadow: "0 8px 30px rgba(0, 0, 0, 0.12)",
              duration: 0.3,
              ease: "power2.out"
            });
            
            if (glowElement) {
              gsap.to(glowElement, {
                opacity: 0.7,
                duration: 0.4
              });
            }
            
            if (highlightElements.length > 0) {
              gsap.to(highlightElements, {
                color: "var(--primary)",
                duration: 0.3
              });
            }
          });
          
          element.addEventListener("mouseleave", () => {
            gsap.to(element, { 
              y: 0, 
              boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
              duration: 0.3,
              ease: "power2.out"
            });
            
            if (glowElement) {
              gsap.to(glowElement, {
                opacity: 0,
                duration: 0.4
              });
            }
            
            if (highlightElements.length > 0) {
              gsap.to(highlightElements, {
                color: "inherit",
                duration: 0.3
              });
            }
          });
        };
        
        createHoverEffect(card);
      });
    }
  }, [isLoading, filteredStatements]);

  // Handle card click to prevent propagation when clicking on buttons
  const handleCardClick = (e: MouseEvent, statement) => {
    // Check if clicking on a button
    if (e.target.closest('button')) {
      e.stopPropagation();
      return;
    }
    viewStatement(statement);
  };

  return (
    <div className="w-full space-y-6 animate-fadeIn">
