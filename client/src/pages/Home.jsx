import Header from '../components/Header';
import ServiceCard from '../components/ServiceCard';
import VendorCard from '../components/VendorCard';
import Footer from '../components/Footer';
import services from '../data/services';
import vendors from '../data/vendors';

function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <section className="bg-cover bg-center h-96 flex items-center justify-center" style={{ backgroundImage: 'url(/assets/hero-bg.jpg)' }}>
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold">Find Trusted Home Services</h1>
            <p className="mt-4 text-lg">Book plumbers, electricians, cleaners, and more.</p>
            <button className="mt-6 px-6 py-3 bg-blue-600 rounded-lg">Explore Services</button>
          </div>
        </section>
        <section className="py-12 px-4 md:px-8">
          <h2 className="text-3xl font-semibold text-center mb-8">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {services.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </section>
        <section className="py-12 px-4 md:px-8 bg-gray-100">
          <h2 className="text-3xl font-semibold text-center mb-8">Top Vendors</h2>
          <div className="flex overflow-x-auto gap-4">
            {vendors.map((vendor) => (
              <VendorCard key={vendor.id} vendor={vendor} />
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default Home;