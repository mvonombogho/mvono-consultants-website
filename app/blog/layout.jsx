import Navbar from '../components/shared/Navbar'
import WorkingEmailChat from '../components/common/WorkingEmailChat'

export default function BlogLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar activePage="blog" />
      <main className="flex-grow">
        {children}
      </main>
      
      {/* Working Email Chat Widget */}
      <WorkingEmailChat 
        businessName="Mvono Consultants"
        position="bottom-right"
      />
    </div>
  );
}
