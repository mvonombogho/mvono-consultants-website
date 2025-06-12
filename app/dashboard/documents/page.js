  return (
    <div className="p-6 space-y-8">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-800">Document Management</h1>
          <p className="text-slate-600 mt-1">Manage and organize all your documents in one place</p>
        </div>
        
        <button 
          onClick={() => setShowUploadForm(!showUploadForm)}
          className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors shadow-sm flex items-center gap-2 text-sm font-medium"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
          </svg>
          {showUploadForm ? 'Cancel Upload' : 'Upload Document'}
        </button>
      </div>
      
      {/* Upload Form */}
      {showUploadForm && (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h2 className="text-lg font-semibold text-slate-800 mb-4">Upload New Document</h2>
          
          <form onSubmit={handleFileUpload} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-slate-700 mb-1">
                  Document Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={uploadFormData.title}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="Enter document title"
                />
              </div>
              
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-slate-700 mb-1">
                  Category
                </label>
                <select
                  id="category"
                  name="category"
                  value={uploadFormData.category}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                >
                  <option value="">Select Category</option>
                  <option value="contract">Contract</option>
                  <option value="invoice">Invoice</option>
                  <option value="certificate">Certificate</option>
                  <option value="report">Report</option>
                  <option value="compliance">Compliance</option>
                  <option value="training">Training</option>
                  <option value="other">Other</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="clientId" className="block text-sm font-medium text-slate-700 mb-1">
                  Associated Client (Optional)
                </label>
                <select
                  id="clientId"
                  name="clientId"
                  value={uploadFormData.clientId}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                >
                  <option value="">Not Associated with a Client</option>
                  {clients.map(client => (
                    <option key={client._id} value={client._id}>
                      {client.name}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label htmlFor="projectId" className="block text-sm font-medium text-slate-700 mb-1">
                  Associated Project (Optional)
                </label>
                <select
                  id="projectId"
                  name="projectId"
                  value={uploadFormData.projectId}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                >
                  <option value="">Not Associated with a Project</option>
                  {projects.map(project => (
                    <option key={project._id} value={project._id}>
                      {project.name}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label htmlFor="expirationDate" className="block text-sm font-medium text-slate-700 mb-1">
                  Expiration Date (Optional)
                </label>
                <input
                  type="date"
                  id="expirationDate"
                  name="expirationDate"
                  value={uploadFormData.expirationDate}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>
              
              <div>
                <label htmlFor="tags" className="block text-sm font-medium text-slate-700 mb-1">
                  Tags (Comma Separated)
                </label>
                <input
                  type="text"
                  id="tags"
                  name="tags"
                  value={uploadFormData.tags}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="safety, audit, certificate"
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-slate-700 mb-1">
                Description (Optional)
              </label>
              <textarea
                id="description"
                name="description"
                value={uploadFormData.description}
                onChange={handleInputChange}
                rows="3"
                className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                placeholder="Enter document description"
              ></textarea>
            </div>
            
            <div>
              <label htmlFor="file" className="block text-sm font-medium text-slate-700 mb-1">
                File
              </label>
              <input
                type="file"
                id="file"
                name="file"
                ref={fileInputRef}
                className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png"
              />
              <p className="mt-1 text-xs text-slate-500">
                Supported formats: PDF, Word, Excel, JPEG, PNG
              </p>
            </div>
            
            {isUploading && (
              <div className="mt-2">
                <div className="w-full bg-slate-200 rounded-full h-2.5">
                  <div 
                    className="bg-emerald-600 h-2.5 rounded-full transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  ></div>
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  Uploading: {uploadProgress}%
                </p>
              </div>
            )}
            
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isUploading}
                className={`px-4 py-2 rounded-md text-white ${isUploading ? 'bg-slate-400 cursor-not-allowed' : 'bg-emerald-600 hover:bg-emerald-700'} transition-colors shadow-sm`}
              >
                {isUploading ? 'Uploading...' : 'Upload Document'}
              </button>
            </div>
          </form>
        </div>
      )}
      
      {/* Search and Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-3">
            <label htmlFor="search" className="sr-only">Search Documents</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                id="search"
                className="block w-full pl-10 pr-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                placeholder="Search by title, description, or tags"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="category-filter" className="sr-only">Filter by Category</label>
            <select
              id="category-filter"
              className="block w-full pl-3 pr-10 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="all">All Categories</option>
              {categories.map((category, index) => (
                <option key={index} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      
      {/* Documents List */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-200">
          <h2 className="text-lg font-semibold text-slate-800">
            Documents {searchTerm ? `matching "${searchTerm}"` : ''}
            {selectedCategory !== 'all' ? ` in ${selectedCategory}` : ''}
          </h2>
        </div>
        
        {loading ? (
          <div className="p-8 text-center text-slate-500">
            <svg className="animate-spin h-8 w-8 mx-auto text-emerald-500 mb-2" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Loading documents...
          </div>
        ) : error ? (
          <div className="p-8 text-center text-red-500">
            {error}
          </div>
        ) : filteredDocuments.length === 0 ? (
          <div className="p-8 text-center text-slate-500">
            No documents found{searchTerm ? ` matching "${searchTerm}"` : ''}.
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {filteredDocuments.map((doc) => (
              <DocumentItem 
                key={doc._id}
                doc={doc}
                openDocument={openDocument}
                deleteDocument={deleteDocument}
                formatFileSize={formatFileSize}
                getFileIcon={getFileIcon}
                formatDate={formatDate}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
