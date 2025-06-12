'use client'

import { useState } from 'react'
import { 
  FaUser, 
  FaLock, 
  FaBuilding, 
  FaCreditCard, 
  FaEnvelope, 
  FaGlobe,
  FaSave,
  FaCheck,
  FaExclamationTriangle
} from 'react-icons/fa'

// Mock company profile
const companyProfile = {
  name: 'Mvono Consultants',
  established: '2009',
  email: 'sales@mvonoconsultants.com',
  phone: '+254 720 270 694',
  address: 'Nairobi, Kenya',
  website: 'www.mvonoconsultants.com',
  description: 'A wholly Kenyan owned consultancy firm specializing in the management of safety, energy, and plant systems.',
  logoUrl: '/images/logo.png',
}

// Mock user profile
const userProfile = {
  name: 'Admin User',
  email: 'admin@mvonoconsultants.com',
  role: 'Administrator',
  lastLogin: '12 Mar 2025, 10:45 AM',
}

// Mock settings options
const settingsOptions = [
  { id: 'emailNotifications', label: 'Email Notifications', description: 'Receive email alerts for new inquiries and system notifications', checked: true },
  { id: 'smsNotifications', label: 'SMS Notifications', description: 'Receive SMS alerts for urgent notifications', checked: false },
  { id: 'invoiceReminders', label: 'Invoice Reminders', description: 'Automatically send reminders for overdue invoices', checked: true },
  { id: 'clientPortal', label: 'Client Portal (Coming Soon)', description: 'Enable clients to access their information online', checked: false, disabled: true },
  { id: 'dataBacking', label: 'Daily Data Backup', description: 'Automatically backup system data daily', checked: true },
]

type TabType = 'profile' | 'password' | 'company' | 'notifications' | 'billing'

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<TabType>('profile')
  const [saveStatus, setSaveStatus] = useState<'none' | 'saving' | 'success' | 'error'>('none')
  const [settingsState, setSettingsState] = useState(settingsOptions)
  
  // Mock form values
  const [profileForm, setProfileForm] = useState({
    name: userProfile.name,
    email: userProfile.email,
  })
  
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  })
  
  const [companyForm, setCompanyForm] = useState({
    name: companyProfile.name,
    email: companyProfile.email,
    phone: companyProfile.phone,
    address: companyProfile.address,
    website: companyProfile.website,
    description: companyProfile.description,
  })
  
  // Toggle setting
  const toggleSetting = (id: string) => {
    setSettingsState(prev => 
      prev.map(setting => 
        setting.id === id && !setting.disabled 
          ? { ...setting, checked: !setting.checked } 
          : setting
      )
    )
  }
  
  // Handle profile form change
  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setProfileForm(prev => ({ ...prev, [name]: value }))
  }
  
  // Handle password form change
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setPasswordForm(prev => ({ ...prev, [name]: value }))
  }
  
  // Handle company form change
  const handleCompanyChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setCompanyForm(prev => ({ ...prev, [name]: value }))
  }
  
  // Save settings
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    setSaveStatus('saving')
    
    // Simulate API call
    setTimeout(() => {
      // 95% chance of success
      if (Math.random() > 0.05) {
        setSaveStatus('success')
      } else {
        setSaveStatus('error')
      }
      
      // Reset status after 3 seconds
      setTimeout(() => {
        setSaveStatus('none')
      }, 3000)
    }, 1000)
  }
  
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Account Settings</h1>
        <p className="text-gray-600 mt-1">Manage your account preferences and information</p>
      </div>
      
      {/* Settings navigation tabs */}
      <div className="mb-8">
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px">
            <button
              className={`py-4 px-6 font-medium text-sm border-b-2 ${
                activeTab === 'profile'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => setActiveTab('profile')}
            >
              <FaUser className="mr-2 inline-block" />
              Profile
            </button>
            <button
              className={`py-4 px-6 font-medium text-sm border-b-2 ${
                activeTab === 'password'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => setActiveTab('password')}
            >
              <FaLock className="mr-2 inline-block" />
              Password
            </button>
            <button
              className={`py-4 px-6 font-medium text-sm border-b-2 ${
                activeTab === 'company'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => setActiveTab('company')}
            >
              <FaBuilding className="mr-2 inline-block" />
              Company
            </button>
            <button
              className={`py-4 px-6 font-medium text-sm border-b-2 ${
                activeTab === 'notifications'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => setActiveTab('notifications')}
            >
              <FaEnvelope className="mr-2 inline-block" />
              Notifications
            </button>
            <button
              className={`py-4 px-6 font-medium text-sm border-b-2 ${
                activeTab === 'billing'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => setActiveTab('billing')}
            >
              <FaCreditCard className="mr-2 inline-block" />
              Billing
            </button>
          </nav>
        </div>
      </div>
      
      {/* Settings content */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {/* Profile Settings */}
        {activeTab === 'profile' && (
          <div className="p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-6">Profile Information</h2>
            
            <form onSubmit={handleSave}>
              <div className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={profileForm.name}
                    onChange={handleProfileChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={profileForm.email}
                    onChange={handleProfileChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Role
                  </label>
                  <div className="px-4 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-700">
                    {userProfile.role}
                  </div>
                  <p className="mt-1 text-sm text-gray-500">
                    Your role cannot be changed. Contact system administrator for role changes.
                  </p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Last Login
                  </label>
                  <div className="px-4 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-700">
                    {userProfile.lastLogin}
                  </div>
                </div>
                
                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={saveStatus === 'saving'}
                    className={`px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors flex items-center ${
                      saveStatus === 'saving' ? 'opacity-70 cursor-not-allowed' : ''
                    }`}
                  >
                    {saveStatus === 'saving' ? (
                      <>Saving...</>
                    ) : saveStatus === 'success' ? (
                      <><FaCheck className="mr-2" /> Saved Successfully</>
                    ) : saveStatus === 'error' ? (
                      <><FaExclamationTriangle className="mr-2" /> Error Saving</>
                    ) : (
                      <><FaSave className="mr-2" /> Save Changes</>
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>
        )}
        
        {/* Password Settings */}
        {activeTab === 'password' && (
          <div className="p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-6">Change Password</h2>
            
            <form onSubmit={handleSave}>
              <div className="space-y-6">
                <div>
                  <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-1">
                    Current Password
                  </label>
                  <input
                    type="password"
                    id="currentPassword"
                    name="currentPassword"
                    value={passwordForm.currentPassword}
                    onChange={handlePasswordChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
                
                <div>
                  <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">
                    New Password
                  </label>
                  <input
                    type="password"
                    id="newPassword"
                    name="newPassword"
                    value={passwordForm.newPassword}
                    onChange={handlePasswordChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                  <p className="mt-1 text-sm text-gray-500">
                    Password must be at least 8 characters and include uppercase, lowercase, numbers, and special characters.
                  </p>
                </div>
                
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={passwordForm.confirmPassword}
                    onChange={handlePasswordChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
                
                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={saveStatus === 'saving' || !passwordForm.currentPassword || !passwordForm.newPassword || !passwordForm.confirmPassword || (passwordForm.newPassword !== passwordForm.confirmPassword)}
                    className={`px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors flex items-center ${
                      (saveStatus === 'saving' || !passwordForm.currentPassword || !passwordForm.newPassword || !passwordForm.confirmPassword || (passwordForm.newPassword !== passwordForm.confirmPassword)) 
                        ? 'opacity-70 cursor-not-allowed' 
                        : ''
                    }`}
                  >
                    {saveStatus === 'saving' ? (
                      <>Saving...</>
                    ) : saveStatus === 'success' ? (
                      <><FaCheck className="mr-2" /> Password Updated</>
                    ) : saveStatus === 'error' ? (
                      <><FaExclamationTriangle className="mr-2" /> Error Updating</>
                    ) : (
                      <><FaSave className="mr-2" /> Update Password</>
                    )}
                  </button>
                  
                  {passwordForm.newPassword && passwordForm.confirmPassword && passwordForm.newPassword !== passwordForm.confirmPassword && (
                    <p className="mt-2 text-sm text-red-600">
                      Passwords do not match.
                    </p>
                  )}
                </div>
              </div>
            </form>
          </div>
        )}
        
        {/* Company Settings */}
        {activeTab === 'company' && (
          <div className="p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-6">Company Information</h2>
            
            <form onSubmit={handleSave}>
              <div className="space-y-6">
                <div>
                  <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-1">
                    Company Name
                  </label>
                  <input
                    type="text"
                    id="companyName"
                    name="name"
                    value={companyForm.name}
                    onChange={handleCompanyChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="companyEmail" className="block text-sm font-medium text-gray-700 mb-1">
                      Company Email
                    </label>
                    <input
                      type="email"
                      id="companyEmail"
                      name="email"
                      value={companyForm.email}
                      onChange={handleCompanyChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="companyPhone" className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="companyPhone"
                      name="phone"
                      value={companyForm.phone}
                      onChange={handleCompanyChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="companyAddress" className="block text-sm font-medium text-gray-700 mb-1">
                    Address
                  </label>
                  <input
                    type="text"
                    id="companyAddress"
                    name="address"
                    value={companyForm.address}
                    onChange={handleCompanyChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
                
                <div>
                  <label htmlFor="companyWebsite" className="block text-sm font-medium text-gray-700 mb-1">
                    Website
                  </label>
                  <div className="flex">
                    <span className="inline-flex items-center px-3 border border-r-0 border-gray-300 bg-gray-50 text-gray-500 rounded-l-md">
                      <FaGlobe />
                    </span>
                    <input
                      type="text"
                      id="companyWebsite"
                      name="website"
                      value={companyForm.website}
                      onChange={handleCompanyChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-r-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="companyDescription" className="block text-sm font-medium text-gray-700 mb-1">
                    Company Description
                  </label>
                  <textarea
                    id="companyDescription"
                    name="description"
                    value={companyForm.description}
                    onChange={handleCompanyChange}
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  ></textarea>
                </div>
                
                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={saveStatus === 'saving'}
                    className={`px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors flex items-center ${
                      saveStatus === 'saving' ? 'opacity-70 cursor-not-allowed' : ''
                    }`}
                  >
                    {saveStatus === 'saving' ? (
                      <>Saving...</>
                    ) : saveStatus === 'success' ? (
                      <><FaCheck className="mr-2" /> Saved Successfully</>
                    ) : saveStatus === 'error' ? (
                      <><FaExclamationTriangle className="mr-2" /> Error Saving</>
                    ) : (
                      <><FaSave className="mr-2" /> Save Changes</>
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>
        )}
        
        {/* Notification Settings */}
        {activeTab === 'notifications' && (
          <div className="p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-6">Notification Preferences</h2>
            
            <form onSubmit={handleSave}>
              <div className="space-y-6">
                {settingsState.map((setting) => (
                  <div key={setting.id} className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id={setting.id}
                        type="checkbox"
                        checked={setting.checked}
                        disabled={setting.disabled}
                        onChange={() => toggleSetting(setting.id)}
                        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor={setting.id} className={`font-medium ${setting.disabled ? 'text-gray-400' : 'text-gray-700'}`}>
                        {setting.label}
                      </label>
                      <p className={setting.disabled ? 'text-gray-400' : 'text-gray-500'}>
                        {setting.description}
                      </p>
                    </div>
                  </div>
                ))}
                
                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={saveStatus === 'saving'}
                    className={`px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors flex items-center ${
                      saveStatus === 'saving' ? 'opacity-70 cursor-not-allowed' : ''
                    }`}
                  >
                    {saveStatus === 'saving' ? (
                      <>Saving...</>
                    ) : saveStatus === 'success' ? (
                      <><FaCheck className="mr-2" /> Saved Successfully</>
                    ) : saveStatus === 'error' ? (
                      <><FaExclamationTriangle className="mr-2" /> Error Saving</>
                    ) : (
                      <><FaSave className="mr-2" /> Save Changes</>
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>
        )}
        
        {/* Billing Settings */}
        {activeTab === 'billing' && (
          <div className="p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-6">Billing Information</h2>
            
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-base font-medium text-gray-900">Standard Plan</h3>
                  <p className="text-sm text-gray-500">Billed annually</p>
                </div>
                <span className="inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  Active
                </span>
              </div>
              
              <div className="flex justify-between items-baseline">
                <span className="text-2xl font-bold text-gray-900">KSh 50,000 <span className="text-sm font-normal text-gray-500">/year</span></span>
                <span className="text-sm text-gray-500">Next billing: Jan 15, 2026</span>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-base font-medium text-gray-900">Payment History</h3>
              
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Amount
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Invoice
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        Jan 15, 2025
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        KSh 50,000
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Paid
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-primary-600 hover:text-primary-900">
                        Download
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        Jan 15, 2024
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        KSh 45,000
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Paid
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-primary-600 hover:text-primary-900">
                        Download
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
