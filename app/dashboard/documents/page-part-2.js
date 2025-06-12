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
