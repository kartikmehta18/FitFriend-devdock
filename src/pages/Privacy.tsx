
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Separator } from "@/components/ui/separator";

const Privacy = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Navbar />
      
      <main className="flex-grow py-16">
        <div className="container px-4 mx-auto max-w-4xl">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8 sm:p-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-6">Privacy Policy</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-8">Last updated: April 1, 2025</p>
            <Separator className="mb-8" />
            
            <div className="prose dark:prose-invert max-w-none">
              <p className="mb-6">
                At FitFriend, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our mobile application. Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the site.
              </p>
              
              <h2 className="text-2xl font-bold mt-8 mb-4">Information We Collect</h2>
              
              <h3 className="text-xl font-semibold mt-6 mb-3">Personal Data</h3>
              <p className="mb-4">
                Personally identifiable information, such as your name, email address, telephone number, and demographic information that you voluntarily give to us when you register with the Site or when you choose to participate in various activities related to the Site. You are under no obligation to provide us with personal information of any kind, however your refusal to do so may prevent you from using certain features of the Site.
              </p>
              
              <h3 className="text-xl font-semibold mt-6 mb-3">Derivative Data</h3>
              <p className="mb-4">
                Information our servers automatically collect when you access the Site, such as your IP address, your browser type, your operating system, your access times, and the pages you have viewed directly before and after accessing the Site.
              </p>
              
              <h3 className="text-xl font-semibold mt-6 mb-3">Health and Fitness Data</h3>
              <p className="mb-4">
                Information related to your fitness activities, workout routines, health metrics, and physical statistics that you choose to provide or that is collected through your use of our fitness tracking features.
              </p>
              
              <h2 className="text-2xl font-bold mt-8 mb-4">Use of Your Information</h2>
              
              <p className="mb-4">Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via the Site to:</p>
              
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li>Create and manage your account.</li>
                <li>Deliver targeted advertising, newsletters, and other information regarding promotions and the Site to you.</li>
                <li>Email you regarding your account.</li>
                <li>Enable user-to-user communications.</li>
                <li>Generate a personal profile about you to make future visits to the Site more personalized.</li>
                <li>Increase the efficiency and operation of the Site.</li>
                <li>Monitor and analyze usage and trends to improve your experience with the Site.</li>
                <li>Notify you of updates to the Site.</li>
                <li>Offer new products, services, and/or recommendations to you.</li>
                <li>Perform other business activities as needed.</li>
                <li>Request feedback and contact you about your use of the Site.</li>
                <li>Resolve disputes and troubleshoot problems.</li>
                <li>Respond to product and customer service requests.</li>
              </ul>
              
              <h2 className="text-2xl font-bold mt-8 mb-4">Disclosure of Your Information</h2>
              
              <p className="mb-4">We may share information we have collected about you in certain situations. Your information may be disclosed as follows:</p>
              
              <h3 className="text-xl font-semibold mt-6 mb-3">By Law or to Protect Rights</h3>
              <p className="mb-4">
                If we believe the release of information about you is necessary to respond to legal process, to investigate or remedy potential violations of our policies, or to protect the rights, property, and safety of others, we may share your information as permitted or required by any applicable law, rule, or regulation.
              </p>
              
              <h3 className="text-xl font-semibold mt-6 mb-3">Third-Party Service Providers</h3>
              <p className="mb-4">
                We may share your information with third parties that perform services for us or on our behalf, including payment processing, data analysis, email delivery, hosting services, customer service, and marketing assistance.
              </p>
              
              <h3 className="text-xl font-semibold mt-6 mb-3">Marketing Communications</h3>
              <p className="mb-4">
                With your consent, or with an opportunity for you to withdraw consent, we may share your information with third parties for marketing purposes.
              </p>
              
              <h3 className="text-xl font-semibold mt-6 mb-3">Interactions with Other Users</h3>
              <p className="mb-4">
                If you interact with other users of the Site, those users may see your name, profile photo, and descriptions of your activity.
              </p>
              
              <h2 className="text-2xl font-bold mt-8 mb-4">Security of Your Information</h2>
              
              <p className="mb-4">
                We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable, and no method of data transmission can be guaranteed against any interception or other type of misuse.
              </p>
              
              <h2 className="text-2xl font-bold mt-8 mb-4">Policy for Children</h2>
              
              <p className="mb-4">
                We do not knowingly solicit information from or market to children under the age of 13. If you become aware of any data we have collected from children under age 13, please contact us using the contact information provided below.
              </p>
              
              <h2 className="text-2xl font-bold mt-8 mb-4">Changes to This Privacy Policy</h2>
              
              <p className="mb-4">
                We may update this privacy policy from time to time in order to reflect, for example, changes to our practices or for other operational, legal or regulatory reasons. The updated version will be indicated by an updated "Revised" date and the updated version will be effective as soon as it is accessible.
              </p>
              
              <h2 className="text-2xl font-bold mt-8 mb-4">Contact Us</h2>
              
              <p className="mb-4">
                If you have questions or comments about this privacy policy, please contact us at:
              </p>
              
              <p className="mb-4">
                FitFriend<br />
                123 Fitness Avenue<br />
                Healthville, CA 90210<br />
                privacy@fitfriend.com<br />
                (800) 555-1234
              </p>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Privacy;
