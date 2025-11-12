import React from "react";

const FAQSection = () => {
  return (
    <section className="w-full bg-gradient-to-b from-gray-50 to-white pt-16">
      <div className="max-w-[1200px] mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-pink-500 mb-10">
          Frequently Asked Questions
        </h2>

        <div className="space-y-4">
          {/* Question 1 */}
          <div className="collapse collapse-plus bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300">
            <input type="radio" name="faq-accordion" defaultChecked />
            <div className="collapse-title font-semibold text-lg text-gray-900 flex items-center justify-between">
              <span>How do I create an account?</span>
            </div>
            <div className="collapse-content text-gray-600 text-[15px] leading-relaxed">
              To create an account, click the{" "}
              <span className="font-medium text-blue-600">“Sign Up”</span>{" "}
              button located at the top-right corner of the homepage. Fill in
              your name, email, and password, then verify your email address.
              Once verified, you’ll be able to log in and start using your
              account immediately.
            </div>
          </div>

          {/* Question 2 */}
          <div className="collapse collapse-plus bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300">
            <input type="radio" name="faq-accordion" />
            <div className="collapse-title font-semibold text-lg text-gray-900 flex items-center justify-between">
              <span>I forgot my password. What should I do?</span>
            </div>
            <div className="collapse-content text-gray-600 text-[15px] leading-relaxed">
              If you’ve forgotten your password, go to the login page and click{" "}
              <span className="font-medium text-blue-600">
                “Forgot Password”
              </span>
              . Enter your registered email address, and we’ll send you a
              password reset link. Follow the instructions in the email to
              create a new password and regain access to your account.
            </div>
          </div>

          {/* Question 3 */}
          <div className="collapse collapse-plus bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300">
            <input type="radio" name="faq-accordion" />
            <div className="collapse-title font-semibold text-lg text-gray-900 flex items-center justify-between">
              <span>How can I update my profile information?</span>
            </div>
            <div className="collapse-content text-gray-600 text-[15px] leading-relaxed">
              You can update your profile anytime by visiting the{" "}
              <span className="font-medium text-blue-600">“My Account”</span>{" "}
              section after logging in. Click on{" "}
              <span className="font-medium text-blue-600">“Edit Profile”</span>{" "}
              to change your name, email, profile photo, or other personal
              details. Don’t forget to click{" "}
              <span className="font-medium text-blue-600">“Save Changes”</span>{" "}
              once you’re done.
            </div>
          </div>

          {/* Question 4 */}
          <div className="collapse collapse-plus bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300">
            <input type="radio" name="faq-accordion" />
            <div className="collapse-title font-semibold text-lg text-gray-900 flex items-center justify-between">
              <span>Can I delete my account permanently?</span>
            </div>
            <div className="collapse-content text-gray-600 text-[15px] leading-relaxed">
              Yes, you can. If you no longer wish to use your account, go to{" "}
              <span className="font-medium text-blue-600">
                “Account Settings”
              </span>{" "}
              and choose{" "}
              <span className="font-medium text-blue-600">
                “Delete Account”
              </span>
              . You’ll be asked to confirm your decision. Once deleted, your
              profile and all associated data will be permanently removed from
              our system and cannot be recovered.
            </div>
          </div>

          {/* Question 5 */}
          <div className="collapse collapse-plus bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300">
            <input type="radio" name="faq-accordion" />
            <div className="collapse-title font-semibold text-lg text-gray-900 flex items-center justify-between">
              <span>How do I contact customer support?</span>
            </div>
            <div className="collapse-content text-gray-600 text-[15px] leading-relaxed">
              If you need assistance, go to the{" "}
              <span className="font-medium text-blue-600">“Contact Us”</span>{" "}
              page and submit your query using the support form. You can also
              reach out via email at{" "}
              <span className="font-medium text-blue-600">
                support@example.com
              </span>
              . Our team is available 24/7 to help you with any issues or
              questions you may have.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
