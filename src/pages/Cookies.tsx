
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Separator } from "@/components/ui/separator";

const Cookies = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Navbar />
      
      <main className="flex-grow py-16">
        <div className="container px-4 mx-auto max-w-4xl">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8 sm:p-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-6">Cookie Policy</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-8">Last updated: April 1, 2025</p>
            <Separator className="mb-8" />
            
            <div className="prose dark:prose-invert max-w-none">
              <p className="mb-6">
                This Cookie Policy explains how FitFriend ("Company", "we", "us", and "our") uses cookies and similar technologies to recognize you when you visit our website or use our mobile application. It explains what these technologies are and why we use them, as well as your rights to control our use of them.
              </p>
              
              <h2 className="text-2xl font-bold mt-8 mb-4">What are cookies?</h2>
              
              <p className="mb-4">
                Cookies are small data files that are placed on your computer or mobile device when you visit a website. Cookies are widely used by website owners in order to make their websites work, or to work more efficiently, as well as to provide reporting information.
              </p>
              
              <p className="mb-4">
                Cookies set by the website owner (in this case, FitFriend) are called "first-party cookies". Cookies set by parties other than the website owner are called "third-party cookies". Third-party cookies enable third-party features or functionality to be provided on or through the website (e.g., advertising, interactive content, and analytics). The parties that set these third-party cookies can recognize your computer both when it visits the website in question and also when it visits certain other websites.
              </p>
              
              <h2 className="text-2xl font-bold mt-8 mb-4">Why do we use cookies?</h2>
              
              <p className="mb-4">
                We use first-party and third-party cookies for several reasons. Some cookies are required for technical reasons in order for our website to operate, and we refer to these as "essential" or "strictly necessary" cookies. Other cookies also enable us to track and target the interests of our users to enhance the experience on our website and application. Third parties serve cookies through our website for advertising, analytics, and other purposes. This is described in more detail below.
              </p>
              
              <h2 className="text-2xl font-bold mt-8 mb-4">Types of cookies we use</h2>
              
              <p className="mb-4">The specific types of first and third-party cookies served through our website and the purposes they perform are described below:</p>
              
              <h3 className="text-xl font-semibold mt-6 mb-3">Essential cookies</h3>
              <p className="mb-4">
                These cookies are strictly necessary to provide you with services available through our website and to use some of its features, such as access to secure areas. Because these cookies are strictly necessary to deliver the website, you cannot refuse them without impacting how our website functions.
              </p>
              
              <h3 className="text-xl font-semibold mt-6 mb-3">Performance and functionality cookies</h3>
              <p className="mb-4">
                These cookies are used to enhance the performance and functionality of our website but are non-essential to their use. However, without these cookies, certain functionality may become unavailable.
              </p>
              
              <h3 className="text-xl font-semibold mt-6 mb-3">Analytics and customization cookies</h3>
              <p className="mb-4">
                These cookies collect information that is used either in aggregate form to help us understand how our website is being used or how effective our marketing campaigns are, or to help us customize our website for you in order to enhance your experience.
              </p>
              
              <h3 className="text-xl font-semibold mt-6 mb-3">Advertising cookies</h3>
              <p className="mb-4">
                These cookies are used to make advertising messages more relevant to you. They perform functions like preventing the same ad from continuously reappearing, ensuring that ads are properly displayed, and in some cases selecting advertisements that are based on your interests.
              </p>
              
              <h3 className="text-xl font-semibold mt-6 mb-3">Social networking cookies</h3>
              <p className="mb-4">
                These cookies are used to enable you to share pages and content that you find interesting on our website through third-party social networking and other websites. These cookies may also be used for advertising purposes.
              </p>
              
              <h2 className="text-2xl font-bold mt-8 mb-4">How can you control cookies?</h2>
              
              <p className="mb-4">
                You have the right to decide whether to accept or reject cookies. You can exercise your cookie preferences by clicking on the appropriate opt-out links provided in the cookie table above.
              </p>
              
              <p className="mb-4">
                You can set or amend your web browser controls to accept or refuse cookies. If you choose to reject cookies, you may still use our website though your access to some functionality and areas of our website may be restricted. As the means by which you can refuse cookies through your web browser controls vary from browser-to-browser, you should visit your browser's help menu for more information.
              </p>
              
              <h2 className="text-2xl font-bold mt-8 mb-4">How often will we update this Cookie Policy?</h2>
              
              <p className="mb-4">
                We may update this Cookie Policy from time to time in order to reflect, for example, changes to the cookies we use or for other operational, legal, or regulatory reasons. Please therefore revisit this Cookie Policy regularly to stay informed about our use of cookies and related technologies.
              </p>
              
              <p className="mb-4">
                The date at the top of this Cookie Policy indicates when it was last updated.
              </p>
              
              <h2 className="text-2xl font-bold mt-8 mb-4">Where can you get further information?</h2>
              
              <p className="mb-4">
                If you have any questions about our use of cookies or other technologies, please contact us at:
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

export default Cookies;
