'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/components/ui/use-toast';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useRouter } from 'next/navigation';
import { Loader2, Upload } from 'lucide-react';

const FileUploadForm = ({ 
  clientId, 
  projectId, 
  invoiceId, 
  subcontractorId,
  onSuccess,
  redirectUrl
}) => {
  const router = useRouter();
  const [isUploading, setIsUploading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    tags: '',
    expirationDate: '',
  });
  const [file, setFile] = useState(null);
  const [fileError, setFileError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    
    if (!selectedFile) {
      setFile(null);
      setFileError('');
      return;
    }

    // Validate file size (10MB limit)
    if (selectedFile.size > 10 * 1024 * 1024) {
      setFileError('File size exceeds 10MB limit');
      setFile(null);
      return;
    }

    setFile(selectedFile);
    setFileError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!file) {
      setFileError('Please select a file');
      return;
    }

    if (!formData.title || !formData.category) {
      toast({
        title: 'Validation Error',
        description: 'Title and category are required',
        variant: 'destructive',
      });
      return;
    }

    setIsUploading(true);

    try {
      const uploadData = new FormData();
      uploadData.append('file', file);
      uploadData.append('title', formData.title);
      uploadData.append('description', formData.description);
      uploadData.append('category', formData.category);
      uploadData.append('tags', formData.tags);
      
      if (formData.expirationDate) {
        uploadData.append('expirationDate', formData.expirationDate);
      }
      
      if (clientId) uploadData.append('clientId', clientId);
      if (projectId) uploadData.append('projectId', projectId);
      if (invoiceId) uploadData.append('invoiceId', invoiceId);
      if (subcontractorId) uploadData.append('subcontractorId', subcontractorId);

      const response = await fetch('/api/documents', {
        method: 'POST',
        body: uploadData,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to upload document');
      }

      const result = await response.json();
      
      toast({
        title: 'Success',
        description: 'Document uploaded successfully',
      });

      // Reset form
      setFormData({
        title: '',
        description: '',
        category: '',
        tags: '',
        expirationDate: '',
      });
      setFile(null);

      // Call success callback if provided
      if (onSuccess) {
        onSuccess(result.document);
      }

      // Redirect if URL provided
      if (redirectUrl) {
        router.push(redirectUrl);
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: error.message || 'Something went wrong',
        variant: 'destructive',
      });
    } finally {
      setIsUploading(false);
    }
  };

  const documentCategories = [
    'Contract',
    'Invoice',
    'Certificate',
    'Report',
    'Proposal',
    'Legal',
    'Training',
    'Compliance',
    'Technical',
    'Other'
  ];

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Upload Document</CardTitle>
        <CardDescription>Upload a new document to the system</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Document title"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Document description"
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category *</Label>
            <Select
              value={formData.category}
              onValueChange={(value) => handleSelectChange('category', value)}
              required
            >
              <SelectTrigger id="category">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {documentCategories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="tags">Tags</Label>
            <Input
              id="tags"
              name="tags"
              value={formData.tags}
              onChange={handleInputChange}
              placeholder="Comma separated tags"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="expirationDate">Expiration Date</Label>
            <Input
              id="expirationDate"
              name="expirationDate"
              type="date"
              value={formData.expirationDate}
              onChange={handleInputChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="file">File *</Label>
            <Input
              id="file"
              type="file"
              onChange={handleFileChange}
              className="cursor-pointer"
              required
            />
            {fileError && <p className="text-sm text-red-500">{fileError}</p>}
            {file && (
              <p className="text-sm text-gray-500">
                Selected: {file.name} ({Math.round(file.size / 1024)} KB)
              </p>
            )}
          </div>

          <Button type="submit" className="w-full" disabled={isUploading}>
            {isUploading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Uploading...
              </>
            ) : (
              <>
                <Upload className="mr-2 h-4 w-4" />
                Upload Document
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default FileUploadForm;
