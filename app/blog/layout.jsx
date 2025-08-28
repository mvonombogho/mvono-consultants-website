import Navbar from '../../components/shared/Navbar'

export default function BlogLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar activePage="blog" />
      <main className="flex-grow">
        {children}
      </main>
    </div>
  );
}
