const MapSection = () => {
  return (
    <div className="mt-12 rounded-xl shadow-2xl overflow-hidden">
      <div className="p-6">
        <h2 className="text-base md:text-xl font-bold  mb-4">Our Location</h2>
        <p className="mb-4">
          Essence Tours and Travels & Treks and Expedition Pvt. LTD.
        </p>
        <p className="">Lakeside, Pokhara, Nepal</p>
      </div>
      <div className="w-full h-[400px]">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d219.7285121445785!2d83.95865098651072!3d28.217773996433355!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3995950584c13853%3A0xa3679f8dbb62e6de!2sEssence%20Tours%20and%20Travels%20%26%20Treks%20and%20Expedition%20Pvt.%20LTD.!5e0!3m2!1sne!2snp!4v1749445432943!5m2!1sne!2snp"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Essence Treks Location"
          className="rounded-b-xl"
        ></iframe>
      </div>
    </div>
  );
};

export default MapSection;
