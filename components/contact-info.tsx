import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaWhatsapp,
  FaFacebook,
} from "react-icons/fa";
import Link from "next/link";

const ContactInfo = () => {
  return (
    <div className="bg-canvas border border-hairline rounded-md p-6">
      <h2 className="text-lg font-semibold text-ink mb-6 pb-4 border-b border-hairline">
        Contact Information
      </h2>

      <div className="space-y-5 mb-6">
        <div className="flex items-start gap-3">
          <FaMapMarkerAlt className="text-mute text-lg mt-0.5 shrink-0" />
          <div>
            <h3 className="text-sm font-medium text-ink mb-0.5">Our Location</h3>
            <p className="text-sm text-body">
              Essence Tours and Travels &amp; Treks and Expedition Pvt. LTD.
            </p>
            <p className="text-sm text-body">Lakeside, Pokhara, Nepal</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <FaPhoneAlt className="text-mute text-lg mt-0.5 shrink-0" />
          <div>
            <h3 className="text-sm font-medium text-ink mb-0.5">Phone Numbers</h3>
            <a href="tel:+9779804148802" className="block text-sm text-body hover:text-ink transition-colors">
              +977-9804148802
            </a>
            <a href="tel:+97761452788" className="block text-sm text-body hover:text-ink transition-colors">
              +061-452788
            </a>
            <a href="tel:+97761452677" className="block text-sm text-body hover:text-ink transition-colors">
              +061-452677
            </a>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <FaEnvelope className="text-mute text-lg mt-0.5 shrink-0" />
          <div>
            <h3 className="text-sm font-medium text-ink mb-0.5">Email Address</h3>
            <a href="mailto:info@essencetreks.com" className="text-sm text-body hover:text-ink transition-colors">
              info@essencetreks.com
            </a>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <FaWhatsapp className="text-mute text-lg mt-0.5 shrink-0" />
          <div>
            <h3 className="text-sm font-medium text-ink mb-0.5">WhatsApp</h3>
            <a
              href="https://wa.me/9779804148802"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-body hover:text-ink transition-colors"
            >
              +977-9804148802
            </a>
          </div>
        </div>
      </div>

      <div className="pt-4 border-t border-hairline">
        <h3 className="text-sm font-medium text-ink mb-3">Connect With Us</h3>
        <Link
          href="https://www.facebook.com/essencetreksinnepal/#"
          target="_blank"
          className="inline-flex items-center gap-2 px-3 py-2 text-sm text-body hover:text-ink hover:bg-canvas-soft rounded-sm transition-colors"
        >
          <FaFacebook className="text-lg" />
          <span>Facebook</span>
        </Link>
      </div>
    </div>
  );
};

export default ContactInfo;
