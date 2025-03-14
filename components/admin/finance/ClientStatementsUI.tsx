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
      {/* Page Header with Animation */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 relative overflow-hidden">
        <div className="z-10">
          <h1 className="text-2xl font-bold tracking-tight relative">
            Client Statements
            <span className="absolute -bottom-1 left-0 w-12 h-1 bg-primary rounded-full"></span>
          </h1>
          <p className="text-muted-foreground mt-3">
            Manage and generate statements for your clients
          </p>
        </div>
        <div className="flex items-center gap-2 z-10">
          <Button
            onClick={() => router.push("/admin/finance/create-statement")}
            className="bg-primary hover:bg-primary/90 text-white transition-all relative overflow-hidden group"
          >
            <span className="relative z-10 flex items-center">
              <FileText className="mr-2 h-4 w-4" />
              New Statement
            </span>
            <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
          </Button>
        </div>
        {/* Background gradient effect */}
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-primary/5 rounded-full filter blur-3xl opacity-50"></div>
      </div>

      {/* Tabs & Search Bar */}
      <div className="space-y-4">
        <Tabs
          defaultValue="all"
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-4">
            <TabsList className="bg-muted/60">
              <TabsTrigger
                value="all"
                className="relative overflow-hidden transition-all group"
              >
                <span className="relative z-10">All Statements</span>
                <div className="absolute inset-0 bg-primary/5 translate-y-full group-data-[state=active]:translate-y-0 transition-transform duration-300"></div>
              </TabsTrigger>
              <TabsTrigger
                value="draft"
                className="relative overflow-hidden transition-all group"
              >
                <span className="relative z-10">Drafts</span>
                <div className="absolute inset-0 bg-primary/5 translate-y-full group-data-[state=active]:translate-y-0 transition-transform duration-300"></div>
              </TabsTrigger>
              <TabsTrigger
                value="sent"
                className="relative overflow-hidden transition-all group"
              >
                <span className="relative z-10">Sent</span>
                <div className="absolute inset-0 bg-primary/5 translate-y-full group-data-[state=active]:translate-y-0 transition-transform duration-300"></div>
              </TabsTrigger>
              <TabsTrigger
                value="overdue"
                className="relative overflow-hidden transition-all group"
              >
                <span className="relative z-10">With Overdue</span>
                <div className="absolute inset-0 bg-primary/5 translate-y-full group-data-[state=active]:translate-y-0 transition-transform duration-300"></div>
              </TabsTrigger>
            </TabsList>

            <div className="flex items-center gap-2">
              <div className="relative w-full sm:w-64 group">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors duration-200" />
                <Input
                  type="search"
                  placeholder="Search statements..."
                  className="pl-8 bg-background pr-4 focus-visible:ring-primary/20 transition-all duration-200 border-muted-foreground/20 focus-visible:border-primary/30"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setShowFilters(!showFilters)}
                className="border-muted-foreground/20 hover:bg-primary/5 hover:border-primary/30 transition-colors duration-200"
              >
                <Filter className="h-4 w-4" />
                <span className="sr-only">Filter</span>
              </Button>
            </div>
          </div>

          {/* Filters */}
          <div ref={filtersRef} className="overflow-hidden h-0 opacity-0">
            <div className="bg-background rounded-lg border p-4 mb-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Payment Status</label>
                <Select
                  value={statusFilter}
                  onValueChange={setStatusFilter}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="All Statuses" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Statuses</SelectItem>
                    <SelectItem value="allPaid">Fully Paid</SelectItem>
                    <SelectItem value="partiallyPaid">
                      Partially Paid
                    </SelectItem>
                    <SelectItem value="unpaid">Unpaid</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Period</label>
                <Select
                  value={periodFilter}
                  onValueChange={setPeriodFilter}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="All Time" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Time</SelectItem>
                    <SelectItem value="lastMonth">Last Month</SelectItem>
                    <SelectItem value="lastQuarter">Last Quarter</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-end col-span-1 sm:col-span-2 gap-2">
                <Button
                  variant="outline"
                  onClick={() => {
                    setStatusFilter("");
                    setPeriodFilter("");
                  }}
                  className="flex-1 gap-1 text-sm group hover:bg-primary/5 transition-colors duration-200"
                >
                  <RefreshCcw className="h-3.5 w-3.5 group-hover:rotate-180 transition-transform duration-500" />{" "}
                  Reset Filters
                </Button>
              </div>
            </div>
          </div>

          {/* Statements List */}
          <TabsContent value="all" className="mt-0">
            <div ref={containerRef} className="space-y-4">
              {isLoading ? (
                <div className="flex flex-col items-center justify-center py-16">
                  <Loader2 className="h-8 w-8 text-primary animate-spin mb-2" />
                  <p className="text-muted-foreground">Loading statements...</p>
                </div>
              ) : filteredStatements.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 bg-muted/30 rounded-lg border border-dashed">
                  <FileText className="h-10 w-10 text-muted-foreground/60 mb-3" />
                  <h3 className="text-lg font-medium mb-1">
                    No statements found
                  </h3>
                  <p className="text-muted-foreground text-center max-w-md mb-4">
                    {searchTerm || statusFilter || periodFilter
                      ? "No statements match your current filters. Try adjusting your search criteria."
                      : "You haven't created any client statements yet."}
                  </p>
                  {!searchTerm && !statusFilter && !periodFilter && (
                    <Button
                      onClick={() =>
                        router.push("/admin/finance/create-statement")
                      }
                      className="bg-primary/90 hover:bg-primary text-white transition-all group relative overflow-hidden"
                    >
                      <span className="relative z-10 flex items-center">
                        <FileText className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform duration-300" />{" "}
                        Create Your First Statement
                      </span>
                      <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
                    </Button>
                  )}
                </div>
              ) : (
                filteredStatements.map((statement, index) => (
                  <Card
                    key={statement.id}
                    ref={(el) => (cardRefs.current[index] = el)}
                    className="overflow-hidden group hover:border-primary/40 transition-all duration-300 relative"
                    onClick={(e) => handleCardClick(e, statement)}
                  >
                    {/* Glow effect on hover */}
                    <div className="card-glow absolute inset-0 bg-gradient-to-tr from-primary/10 to-primary/5 opacity-0 pointer-events-none"></div>
                    
                    <div className="cursor-pointer">
                      <CardHeader className="bg-muted/30 px-5 py-4">
                        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3">
                          <div className="flex items-start gap-3">
                            <div className="mt-0.5">
                              <Users className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
                            </div>
                            <div>
                              <CardTitle className="text-base font-medium highlight-on-hover">
                                {statement.client.name}
                              </CardTitle>
                              <p className="text-sm text-muted-foreground truncate max-w-xs">
                                {statement.client.email}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge
                              variant="secondary"
                              className={`${getStatusColor(
                                statement.status
                              )} capitalize badge-animate`}
                            >
                              {statement.status}
                            </Badge>
                            {statement.invoices.some(
                              (inv) => inv.status === "overdue"
                            ) && (
                              <Badge
                                variant="secondary"
                                className="bg-red-100 text-red-800 badge-animate"
                              >
                                Overdue
                              </Badge>
                            )}
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="px-5 py-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <div className="flex items-center gap-1 text-muted-foreground text-sm mb-1">
                              <Calendar className="h-3.5 w-3.5" />
                              <span>Statement Period:</span>
                            </div>
                            <p className="text-sm font-medium">
                              {formatDate(statement.statementPeriod.from)} -{" "}
                              {formatDate(statement.statementPeriod.to)}
                            </p>
                          </div>
                          <div>
                            <div className="flex items-center gap-1 text-muted-foreground text-sm mb-1">
                              <Mail className="h-3.5 w-3.5" />
                              <span>Generated:</span>
                            </div>
                            <p className="text-sm font-medium">
                              {formatDate(statement.generatedDate)}
                            </p>
                          </div>
                        </div>

                        <div className="mt-4">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm text-muted-foreground">
                              Opening Balance
                            </span>
                            <span className="font-medium">
                              {formatCurrency(
                                statement.openingBalance,
                                statement.currency
                              )}
                            </span>
                          </div>
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm text-muted-foreground">
                              Closing Balance
                            </span>
                            <span className="font-medium">
                              {formatCurrency(
                                statement.closingBalance,
                                statement.currency
                              )}
                            </span>
                          </div>
                          <div className="flex justify-between items-center pt-2 border-t mt-2">
                            <span className="text-sm font-medium">
                              Total Due
                            </span>
                            <span
                              className={`font-bold ${
                                statement.totalDue > 0
                                  ? "text-red-600"
                                  : "text-green-600"
                              }`}
                            >
                              {formatCurrency(
                                statement.totalDue,
                                statement.currency
                              )}
                            </span>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="px-5 py-3 bg-muted/20 flex justify-between">
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">
                            {statement.invoices.length} invoice(s)
                          </span>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-xs gap-1 text-primary hover:text-primary hover:bg-primary/5 -mr-2 group"
                          onClick={(e) => {
                            e.stopPropagation();
                            viewStatement(statement);
                          }}
                        >
                          View Details{" "}
                          <ArrowRight className="h-3 w-3 ml-1 group-hover:translate-x-1 transition-transform duration-300" />
                        </Button>
                      </CardFooter>
                    </div>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>

          {/* Other tab contents - simplified for brevity */}
          <TabsContent value="draft" className="mt-0">
            <div className="space-y-4">
              {/* Content for draft statements - uses same filtering logic */}
            </div>
          </TabsContent>

          <TabsContent value="sent" className="mt-0">
            <div className="space-y-4">
              {/* Content for sent statements - uses same filtering logic */}
            </div>
          </TabsContent>

          <TabsContent value="overdue" className="mt-0">
            <div className="space-y-4">
              {/* Content for overdue statements - uses same filtering logic */}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Statement Modal */}
      {isModalOpen && (
        <>
          <div
            ref={modalBackdropRef}
            className="fixed inset-0 bg-black/50 z-50 backdrop-blur-sm"
            onClick={closeModal}
          />
          <div
            ref={modalRef}
            className="fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl max-h-[90vh] overflow-auto rounded-lg bg-background shadow-xl border border-primary/10"
            onClick={(e) => e.stopPropagation()}
          >
            {selectedStatement && (
              <>
                <div className="sticky top-0 z-20 bg-background border-b flex justify-between items-center p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-full">
                      <FileText className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h2 className="text-lg font-semibold">
                        {selectedStatement.client.name} Statement
                      </h2>
                      <p className="text-sm text-muted-foreground">
                        {formatDate(selectedStatement.statementPeriod.from)} -{" "}
                        {formatDate(selectedStatement.statementPeriod.to)}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-muted-foreground hover:text-foreground rounded-full hover:bg-muted/80 transition-colors"
                    onClick={closeModal}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
