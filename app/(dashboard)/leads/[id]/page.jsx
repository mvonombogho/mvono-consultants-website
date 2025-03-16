      // First create a new client
      const clientResponse = await fetch('/api/clients', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!clientResponse.ok) {
        const error = await clientResponse.json();
        throw new Error(error.error || 'Failed to create client');
      }

      const client = await clientResponse.json();

      // Then update the lead to converted status
      const leadResponse = await fetch(`/api/leads/${lead.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          status: 'converted',
          conversionDate: new Date().toISOString(),
        }),
      });

      if (!leadResponse.ok) {
        const error = await leadResponse.json();
        throw new Error(error.error || 'Failed to update lead');
      }

      const updatedLead = await leadResponse.json();
      toast.success('Lead successfully converted to client');
      setIsOpen(false);
      onLeadUpdated(updatedLead);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="bg-green-600 hover:bg-green-700">
          <ChevronRight className="mr-2 h-4 w-4" />
          Convert to Client
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Convert Lead to Client</DialogTitle>
          <DialogDescription>
            Create a new client record based on this lead's information.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <Label htmlFor="name">
                  Client Name <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
              <div className="col-span-2">
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label htmlFor="contactPerson">Contact Person</Label>
                <Input
                  id="contactPerson"
                  name="contactPerson"
                  value={formData.contactPerson}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label htmlFor="contactPosition">Position</Label>
                <Input
                  id="contactPosition"
                  name="contactPosition"
                  value={formData.contactPosition}
                  onChange={handleChange}
                />
              </div>
              <div className="col-span-2">
                <Label htmlFor="industry">Industry</Label>
                <Input
                  id="industry"
                  name="industry"
                  value={formData.industry}
                  onChange={handleChange}
                />
              </div>
              <div className="col-span-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  rows={3}
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsOpen(false)}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading} className="bg-green-600 hover:bg-green-700">
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Convert to Client
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );