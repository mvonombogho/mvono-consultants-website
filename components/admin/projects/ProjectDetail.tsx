{/* Invoices Table Headers - Continuation */}
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {project.invoices.map(invoice => (
                      <tr key={invoice.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Link 
                            href={`/admin/invoices/${invoice.id}`}
                            className="font-medium text-blue-600 hover:text-blue-800 transition-colors"
                          >
                            {invoice.invoiceNumber}
                          </Link>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                          {formatDate(invoice.date)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-900 font-medium">
                          {formatCurrency(invoice.amount)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getInvoiceStatusInfo(invoice.status).color}`}>
                            {getInvoiceStatusInfo(invoice.status).icon}
                            {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                          <Link 
                            href={`/admin/invoices/${invoice.id}`}
                            className="text-blue-600 hover:text-blue-900 transition-colors mr-3"
                          >
                            View
                          </Link>
                          <Link 
                            href={`/admin/invoices/${invoice.id}/edit`}
                            className="text-blue-600 hover:text-blue-900 transition-colors mr-3"
                          >
                            Edit
                          </Link>
                          <button 
                            onClick={() => alert(`Generate PDF for invoice ${invoice.id}`)}
                            className="text-gray-600 hover:text-gray-900 transition-colors"
                          >
                            Download
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="p-6 text-center">
                <p className="text-gray-500 mb-4">No invoices have been created for this project yet.</p>
                <Link 
                  href={`/admin/invoices/new?projectId=${project.id}`}
                  className="text-blue-600 hover:text-blue-800 transition-colors inline-flex items-center"
                >
                  <Plus className="h-4 w-4 mr-1" />
                  <span>Create first invoice</span>
                </Link>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <>
          {/* Modal Backdrop */}
          <div 
            ref={modalBackdropRef}
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center"
            onClick={closeDeleteModal}
          ></div>
          
          {/* Modal Content */}
          <div 
            ref={modalRef}
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg z-50 w-full max-w-md p-6"
            onClick={e => e.stopPropagation()}
          >
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Delete Project</h3>
              <p className="text-gray-500 mb-6">
                Are you sure you want to delete this project? This action cannot be undone.
                All data including tasks and project details will be permanently removed.
              </p>
            </div>
            
            {error && (
              <div className="mb-4 p-3 bg-red-50 text-red-700 text-sm rounded-md">
                {error}
              </div>
            )}
            
            <div className="flex justify-end gap-3">
              <button
                type="button"
                className="px-4 py-2 bg-white border border-gray-300 rounded-md text-gray-700 text-sm font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                onClick={closeDeleteModal}
                disabled={isDeleting}
              >
                Cancel
              </button>
              <button
                type="button"
                className="px-4 py-2 bg-red-600 text-white rounded-md text-sm font-medium hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 flex items-center"
                onClick={handleDeleteProject}
                disabled={isDeleting}
              >
                {isDeleting ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    <span>Deleting...</span>
                  </>
                ) : (
                  <span>Delete Project</span>
                )}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}