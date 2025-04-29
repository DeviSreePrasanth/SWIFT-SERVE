import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import VendorCard from '../components/VendorCard';
import BookingForm from '../components/BookingForm';
import Footer from '../components/Footer';
import {services} from '../data/services';
import {vendors} from '../data/vendors';

function ServiceDetails() {
  const { serviceId } = useParams();
  const service = services.find((s) => s.id === serviceId);
  const serviceVendors = vendors.filter((v) => v.serviceId === serviceId);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow py-12 px-4 md:px-8">
        <section className="mb-12">
          <img src={service.image} alt={service.name} className="w-full h-64 object-cover rounded-lg" />
          <h1 className="text-3xl font-bold mt-6">{service.name}</h1>
          <p className="mt-4 text-gray-600">{service.description}</p>
          <ul className="mt-4 list-disc list-inside">
            {service.features.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
        </section>
        <section>
          <h2 className="text-2xl font-semibold mb-6">Available Vendors</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {serviceVendors.map((vendor) => (
              <VendorCard key={vendor.id} vendor={vendor} />
            ))}
          </div>
        </section>
        <BookingForm service={service} />
      </main>
      <Footer />
    </div>
  );
}

export default ServiceDetails;