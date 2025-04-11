import React, { useState } from "react";
import {
  Shield,
  BadgeCheck,
  FileCheck,
  Star,
  CreditCard,
  AlertTriangle,
  AlertCircle,
  MapPin,
  Award,
  FileText,
  CheckSquare,
} from "lucide-react";

const Safety = () => {
  const [activeTab, setActiveTab] = useState("verification");

  return (
    <section className="bg-white py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Your Safety Is Our Priority
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            We implement rigorous security measures tailored to Indian families'
            needs, ensuring you connect with trusted caregivers for your loved
            ones.
          </p>
        </div>

        <div className="flex flex-wrap mb-8">
          <div className="w-full md:w-1/4">
            <div className="flex flex-col border-r border-gray-200 pr-4 mb-6 md:mb-0">
              <button
                className={`py-3 px-4 text-left mb-2 rounded-lg ${
                  activeTab === "verification"
                    ? "bg-blue-100 text-blue-700 font-medium"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
                onClick={() => setActiveTab("verification")}
              >
                <FileCheck className="inline-block mr-2" size={20} />
                ID & Background Verification
              </button>
              <button
                className={`py-3 px-4 text-left mb-2 rounded-lg ${
                  activeTab === "ratings"
                    ? "bg-blue-100 text-blue-700 font-medium"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
                onClick={() => setActiveTab("ratings")}
              >
                <Star className="inline-block mr-2" size={20} />
                Ratings & Reviews
              </button>
              <button
                className={`py-3 px-4 text-left mb-2 rounded-lg ${
                  activeTab === "badges"
                    ? "bg-blue-100 text-blue-700 font-medium"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
                onClick={() => setActiveTab("badges")}
              >
                <BadgeCheck className="inline-block mr-2" size={20} />
                Trust Badges
              </button>
              <button
                className={`py-3 px-4 text-left mb-2 rounded-lg ${
                  activeTab === "payments"
                    ? "bg-blue-100 text-blue-700 font-medium"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
                onClick={() => setActiveTab("payments")}
              >
                <CreditCard className="inline-block mr-2" size={20} />
                Secure Payments & Contracts
              </button>
              <button
                className={`py-3 px-4 text-left mb-2 rounded-lg ${
                  activeTab === "dispute"
                    ? "bg-blue-100 text-blue-700 font-medium"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
                onClick={() => setActiveTab("dispute")}
              >
                <AlertTriangle className="inline-block mr-2" size={20} />
                Reporting & Dispute Resolution
              </button>
              <button
                className={`py-3 px-4 text-left mb-2 rounded-lg ${
                  activeTab === "emergency"
                    ? "bg-blue-100 text-blue-700 font-medium"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
                onClick={() => setActiveTab("emergency")}
              >
                <AlertCircle className="inline-block mr-2" size={20} />
                Emergency Features
              </button>
              <button
                className={`py-3 px-4 text-left mb-2 rounded-lg ${
                  activeTab === "training"
                    ? "bg-blue-100 text-blue-700 font-medium"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
                onClick={() => setActiveTab("training")}
              >
                <Shield className="inline-block mr-2" size={20} />
                Training & Compliance
              </button>
            </div>
          </div>

          <div className="w-full md:w-3/4 pl-0 md:pl-8">
            {activeTab === "verification" && (
              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                <h3 className="text-xl font-bold text-gray-800 mb-4">
                  ID & Background Verification
                </h3>

                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-gray-700 mb-2">
                    Aadhaar & PAN Verification
                  </h4>
                  <p className="text-gray-600 mb-4">
                    We integrate with UIDAI for Aadhaar verification and NSDL
                    for PAN checks to confirm caregivers' identities, providing
                    multiple layers of verification essential for Indian
                    households.
                  </p>
                  <div className="flex items-center mb-2 text-green-600">
                    <CheckSquare size={18} className="mr-2" />
                    <span>Biometric verification through Aadhaar</span>
                  </div>
                  <div className="flex items-center mb-2 text-green-600">
                    <CheckSquare size={18} className="mr-2" />
                    <span>OTP-based authentication</span>
                  </div>
                  <div className="flex items-center text-green-600">
                    <CheckSquare size={18} className="mr-2" />
                    <span>PAN card validity check</span>
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-gray-700 mb-2">
                    Police Verification
                  </h4>
                  <p className="text-gray-600 mb-4">
                    We collaborate with IDfy and local police departments for
                    criminal record checks, a critical safety measure for
                    caregivers entering Indian homes.
                  </p>
                  <div className="flex items-center mb-2 text-green-600">
                    <CheckSquare size={18} className="mr-2" />
                    <span>
                      Criminal background check across all Indian states
                    </span>
                  </div>
                  <div className="flex items-center text-green-600">
                    <CheckSquare size={18} className="mr-2" />
                    <span>
                      Physical police verification at registered address
                    </span>
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-gray-700 mb-2">
                    Address Verification
                  </h4>
                  <p className="text-gray-600 mb-4">
                    We require proof of address through utility bills, rental
                    agreements, or local authority certification to ensure
                    caregivers have stable living situations.
                  </p>
                  <div className="flex items-center mb-2 text-green-600">
                    <CheckSquare size={18} className="mr-2" />
                    <span>Physical address verification</span>
                  </div>
                  <div className="flex items-center text-green-600">
                    <CheckSquare size={18} className="mr-2" />
                    <span>
                      Document authentication through DigiLocker integration
                    </span>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-gray-700 mb-2">
                    Employment & Experience Verification
                  </h4>
                  <p className="text-gray-600 mb-4">
                    We check past work records and contact previous employers to
                    validate experience, particularly important for specialized
                    care roles.
                  </p>
                  <div className="flex items-center mb-2 text-green-600">
                    <CheckSquare size={18} className="mr-2" />
                    <span>Reference checks with previous employers</span>
                  </div>
                  <div className="flex items-center mb-2 text-green-600">
                    <CheckSquare size={18} className="mr-2" />
                    <span>
                      Verification of certifications and qualifications
                    </span>
                  </div>
                  <div className="flex items-center text-green-600">
                    <CheckSquare size={18} className="mr-2" />
                    <span>Skills assessment through in-person interviews</span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "ratings" && (
              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                <h3 className="text-xl font-bold text-gray-800 mb-4">
                  Ratings & Reviews System
                </h3>

                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-gray-700 mb-2">
                    Comprehensive Rating System
                  </h4>
                  <p className="text-gray-600 mb-4">
                    Our platform allows families to rate caregivers on multiple
                    dimensions including punctuality, professionalism,
                    communication, and quality of care - all key concerns for
                    Indian households.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="p-4 border border-gray-200 rounded-lg">
                      <h5 className="font-medium text-gray-700 mb-1">
                        Punctuality
                      </h5>
                      <div className="flex items-center">
                        <Star
                          className="text-yellow-500 fill-current"
                          size={18}
                        />
                        <Star
                          className="text-yellow-500 fill-current"
                          size={18}
                        />
                        <Star
                          className="text-yellow-500 fill-current"
                          size={18}
                        />
                        <Star
                          className="text-yellow-500 fill-current"
                          size={18}
                        />
                        <Star className="text-gray-300" size={18} />
                      </div>
                    </div>
                    <div className="p-4 border border-gray-200 rounded-lg">
                      <h5 className="font-medium text-gray-700 mb-1">
                        Professionalism
                      </h5>
                      <div className="flex items-center">
                        <Star
                          className="text-yellow-500 fill-current"
                          size={18}
                        />
                        <Star
                          className="text-yellow-500 fill-current"
                          size={18}
                        />
                        <Star
                          className="text-yellow-500 fill-current"
                          size={18}
                        />
                        <Star
                          className="text-yellow-500 fill-current"
                          size={18}
                        />
                        <Star
                          className="text-yellow-500 fill-current"
                          size={18}
                        />
                      </div>
                    </div>
                    <div className="p-4 border border-gray-200 rounded-lg">
                      <h5 className="font-medium text-gray-700 mb-1">
                        Communication
                      </h5>
                      <div className="flex items-center">
                        <Star
                          className="text-yellow-500 fill-current"
                          size={18}
                        />
                        <Star
                          className="text-yellow-500 fill-current"
                          size={18}
                        />
                        <Star
                          className="text-yellow-500 fill-current"
                          size={18}
                        />
                        <Star className="text-gray-300" size={18} />
                        <Star className="text-gray-300" size={18} />
                      </div>
                    </div>
                    <div className="p-4 border border-gray-200 rounded-lg">
                      <h5 className="font-medium text-gray-700 mb-1">
                        Quality of Care
                      </h5>
                      <div className="flex items-center">
                        <Star
                          className="text-yellow-500 fill-current"
                          size={18}
                        />
                        <Star
                          className="text-yellow-500 fill-current"
                          size={18}
                        />
                        <Star
                          className="text-yellow-500 fill-current"
                          size={18}
                        />
                        <Star
                          className="text-yellow-500 fill-current"
                          size={18}
                        />
                        <Star className="text-gray-300" size={18} />
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-gray-700 mb-2">
                    Verified User Reviews
                  </h4>
                  <p className="text-gray-600 mb-4">
                    All reviews are from verified clients who have actually used
                    the caregiver's services, preventing fake or biased reviews
                    - a common concern in the Indian service sector.
                  </p>
                  <div className="space-y-4">
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center mb-2">
                        <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                          <span className="font-medium text-blue-700">RS</span>
                        </div>
                        <div>
                          <p className="font-medium">Reema Sharma</p>
                          <div className="flex items-center">
                            <Star
                              className="text-yellow-500 fill-current"
                              size={14}
                            />
                            <Star
                              className="text-yellow-500 fill-current"
                              size={14}
                            />
                            <Star
                              className="text-yellow-500 fill-current"
                              size={14}
                            />
                            <Star
                              className="text-yellow-500 fill-current"
                              size={14}
                            />
                            <Star
                              className="text-yellow-500 fill-current"
                              size={14}
                            />
                            <span className="text-sm text-gray-500 ml-2">
                              Verified Hire
                            </span>
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-700">
                        "Meena has been taking care of my mother for 3 months
                        now. She is punctual, respectful of our cultural
                        preferences, and very attentive to my mother's needs. I
                        can finally go to work with peace of mind."
                      </p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center mb-2">
                        <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                          <span className="font-medium text-blue-700">VP</span>
                        </div>
                        <div>
                          <p className="font-medium">Vikram Patel</p>
                          <div className="flex items-center">
                            <Star
                              className="text-yellow-500 fill-current"
                              size={14}
                            />
                            <Star
                              className="text-yellow-500 fill-current"
                              size={14}
                            />
                            <Star
                              className="text-yellow-500 fill-current"
                              size={14}
                            />
                            <Star
                              className="text-yellow-500 fill-current"
                              size={14}
                            />
                            <Star className="text-gray-300" size={14} />
                            <span className="text-sm text-gray-500 ml-2">
                              Verified Hire
                            </span>
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-700">
                        "Rajesh has been excellent with my father who is
                        recovering from stroke. He understands local language
                        which makes communication easier and follows all our
                        family's dietary restrictions carefully."
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "badges" && (
              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                <h3 className="text-xl font-bold text-gray-800 mb-4">
                  Trust Badges
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="border border-gray-200 rounded-lg p-5">
                    <div className="flex items-center mb-3">
                      <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center mr-4">
                        <BadgeCheck className="text-green-600" size={24} />
                      </div>
                      <h4 className="text-lg font-semibold text-gray-700">
                        Verified Caregiver
                      </h4>
                    </div>
                    <p className="text-gray-600">
                      Caregivers with this badge have successfully passed our
                      comprehensive background verification process, including
                      Aadhaar, PAN, and police verification.
                    </p>
                  </div>

                  <div className="border border-gray-200 rounded-lg p-5">
                    <div className="flex items-center mb-3">
                      <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                        <Award className="text-blue-600" size={24} />
                      </div>
                      <h4 className="text-lg font-semibold text-gray-700">
                        Top Performer
                      </h4>
                    </div>
                    <p className="text-gray-600">
                      This badge is awarded to caregivers who consistently
                      receive high ratings (4.8+) and have served at least 10
                      families without complaints.
                    </p>
                  </div>

                  <div className="border border-gray-200 rounded-lg p-5">
                    <div className="flex items-center mb-3">
                      <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center mr-4">
                        <Shield className="text-purple-600" size={24} />
                      </div>
                      <h4 className="text-lg font-semibold text-gray-700">
                        Certified Professional
                      </h4>
                    </div>
                    <p className="text-gray-600">
                      Caregivers with this badge have completed specialized
                      training and certification in their field, verified by
                      recognized Indian medical or care institutions.
                    </p>
                  </div>

                  <div className="border border-gray-200 rounded-lg p-5">
                    <div className="flex items-center mb-3">
                      <div className="h-12 w-12 rounded-full bg-yellow-100 flex items-center justify-center mr-4">
                        <MapPin className="text-yellow-600" size={24} />
                      </div>
                      <h4 className="text-lg font-semibold text-gray-700">
                        Local Expert
                      </h4>
                    </div>
                    <p className="text-gray-600">
                      This badge indicates caregivers who are proficient in
                      local languages and familiar with regional cultural norms
                      and dietary practices, important for Indian households.
                    </p>
                  </div>
                </div>

                <div className="bg-blue-50 p-5 rounded-lg">
                  <h4 className="text-lg font-semibold text-blue-700 mb-2">
                    How Badges Build Trust
                  </h4>
                  <p className="text-gray-700 mb-4">
                    Our badge system is designed specifically for the Indian
                    context, addressing cultural sensitivities and local
                    concerns around hiring home-based caregivers.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <CheckSquare
                        className="text-blue-600 mr-2 mt-1 flex-shrink-0"
                        size={18}
                      />
                      <span>
                        All badges are earned through verified accomplishments,
                        not purchased
                      </span>
                    </li>
                    <li className="flex items-start">
                      <CheckSquare
                        className="text-blue-600 mr-2 mt-1 flex-shrink-0"
                        size={18}
                      />
                      <span>
                        Badge criteria are transparent and consistent across all
                        caregivers
                      </span>
                    </li>
                    <li className="flex items-start">
                      <CheckSquare
                        className="text-blue-600 mr-2 mt-1 flex-shrink-0"
                        size={18}
                      />
                      <span>
                        Badges can be revoked if standards are not maintained
                      </span>
                    </li>
                    <li className="flex items-start">
                      <CheckSquare
                        className="text-blue-600 mr-2 mt-1 flex-shrink-0"
                        size={18}
                      />
                      <span>
                        Special badges highlight caregivers familiar with
                        regional customs and languages
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            )}

            {activeTab === "payments" && (
              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                <h3 className="text-xl font-bold text-gray-800 mb-4">
                  Secure Payments & Contracts
                </h3>

                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-gray-700 mb-2">
                    Secure Payment Systems
                  </h4>
                  <p className="text-gray-600 mb-4">
                    Our platform integrates with India's most trusted payment
                    gateways for secure transactions with escrow protection.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="border border-gray-200 rounded-lg p-4">
                      <h5 className="font-medium text-gray-700 mb-2">
                        Razorpay Integration
                      </h5>
                      <p className="text-gray-600 text-sm">
                        Secure payments with India's leading payment gateway,
                        supporting UPI, net banking, and all major credit/debit
                        cards.
                      </p>
                    </div>
                    <div className="border border-gray-200 rounded-lg p-4">
                      <h5 className="font-medium text-gray-700 mb-2">
                        PayU Support
                      </h5>
                      <p className="text-gray-600 text-sm">
                        Alternative payment processing with comprehensive fraud
                        protection and multi-layer authentication.
                      </p>
                    </div>
                  </div>
                  <div className="bg-yellow-50 p-4 rounded-lg">
                    <h5 className="font-medium text-yellow-700 mb-1">
                      Escrow Payment Protection
                    </h5>
                    <p className="text-gray-700 text-sm">
                      Payments are held in escrow until services are
                      satisfactorily completed, providing protection to both
                      families and caregivers - a system adapted for the Indian
                      market.
                    </p>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-gray-700 mb-2">
                    Service Agreements & Contracts
                  </h4>
                  <p className="text-gray-600 mb-4">
                    Our platform provides legally compliant service agreements
                    customized for the Indian regulatory environment.
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-3 flex-shrink-0">
                        <FileText className="text-blue-600" size={20} />
                      </div>
                      <div>
                        <h5 className="font-medium text-gray-700 mb-1">
                          Standardized Service Contracts
                        </h5>
                        <p className="text-gray-600 text-sm">
                          Clearly defined terms of service with provisions for
                          working hours, responsibilities, compensation, and
                          leave policy - addressing common issues in Indian
                          domestic help arrangements.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-3 flex-shrink-0">
                        <Shield className="text-blue-600" size={20} />
                      </div>
                      <div>
                        <h5 className="font-medium text-gray-700 mb-1">
                          Confidentiality Agreements
                        </h5>
                        <p className="text-gray-600 text-sm">
                          Protection for family privacy with legally binding
                          confidentiality clauses, important for maintaining
                          household privacy in Indian contexts.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-3 flex-shrink-0">
                        <CheckSquare className="text-blue-600" size={20} />
                      </div>
                      <div>
                        <h5 className="font-medium text-gray-700 mb-1">
                          Digital Contract Signing
                        </h5>
                        <p className="text-gray-600 text-sm">
                          Secure e-signature functionality compliant with Indian
                          IT Act for legally binding agreements, with OTP
                          verification for additional security.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "dispute" && (
              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                <h3 className="text-xl font-bold text-gray-800 mb-4">
                  Reporting & Dispute Resolution
                </h3>

                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-gray-700 mb-2">
                    Reporting System
                  </h4>
                  <p className="text-gray-600 mb-4">
                    Our platform provides comprehensive tools for reporting
                    issues with caregivers, with special attention to concerns
                    common in Indian households.
                  </p>
                  <div className="border border-gray-200 rounded-lg p-5">
                    <h5 className="font-medium text-gray-700 mb-3">
                      Report Caregiver Feature
                    </h5>
                    <div className="space-y-3">
                      <div className="flex items-start">
                        <AlertCircle
                          className="text-red-500 mr-2 mt-1 flex-shrink-0"
                          size={18}
                        />
                        <div>
                          <p className="font-medium text-gray-700">
                            Immediate Concerns
                          </p>
                          <p className="text-gray-600 text-sm">
                            Report urgent issues like misconduct, negligence, or
                            inappropriate behavior
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <AlertTriangle
                          className="text-yellow-500 mr-2 mt-1 flex-shrink-0"
                          size={18}
                        />
                        <div>
                          <p className="font-medium text-gray-700">
                            Service Quality Issues
                          </p>
                          <p className="text-gray-600 text-sm">
                            Report problems related to care quality,
                            punctuality, or non-adherence to agreed terms
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <Shield
                          className="text-blue-500 mr-2 mt-1 flex-shrink-0"
                          size={18}
                        />
                        <div>
                          <p className="font-medium text-gray-700">
                            Background Verification Concerns
                          </p>
                          <p className="text-gray-600 text-sm">
                            Report inconsistencies in documented background or
                            qualifications
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-gray-700 mb-2">
                    Dispute Resolution Process
                  </h4>
                  <p className="text-gray-600 mb-4">
                    Our specialized dispute resolution team handles conflicts
                    with cultural sensitivity and understanding of local norms.
                  </p>
                  <div className="space-y-4">
                    <div className="p-4 border-l-4 border-blue-500 bg-blue-50">
                      <h5 className="font-medium text-gray-700 mb-1">
                        Initial Assessment (24 Hours)
                      </h5>
                      <p className="text-gray-600 text-sm">
                        Dedicated team reviews reported issues and contacts both
                        parties for initial information, with response
                        guaranteed within 24 hours.
                      </p>
                    </div>
                    <div className="p-4 border-l-4 border-blue-500 bg-blue-50">
                      <h5 className="font-medium text-gray-700 mb-1">
                        Mediation Process (3-5 Days)
                      </h5>
                      <p className="text-gray-600 text-sm">
                        Neutral mediators work with both parties to reach a
                        mutually satisfactory resolution, with option for local
                        language support.
                      </p>
                    </div>
                    <div className="p-4 border-l-4 border-blue-500 bg-blue-50">
                      <h5 className="font-medium text-gray-700 mb-1">
                        Resolution & Action (Within 7 Days)
                      </h5>
                      <p className="text-gray-600 text-sm">
                        Implement agreed solutions, which may include
                        compensation, service adjustments, or in serious cases,
                        caregiver removal from the platform.
                      </p>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg">
                      <h5 className="font-medium text-green-700 mb-1">
                        Culturally Sensitive Approach
                      </h5>
                      <p className="text-gray-700 text-sm">
                        Our dispute resolution team includes members familiar
                        with diverse Indian cultural contexts and regional
                        sensitivities to ensure fair and appropriate solutions.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "emergency" && (
              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                <h3 className="text-xl font-bold text-gray-800 mb-4">
                  Emergency Safety Features
                </h3>

                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-gray-700 mb-2">
                    Live Location Tracking
                  </h4>
                  <p className="text-gray-600 mb-4">
                    Optional live location tracking during caregiving sessions
                    provides peace of mind to families, especially important in
                    India's urban centers.
                  </p>
                  <div className="rounded-lg overflow-hidden border border-gray-200 mb-4">
                    <div className="bg-gray-100 p-4">
                      <h5 className="font-medium text-gray-700 mb-1">
                        How It Works
                      </h5>
                      <p className="text-gray-600 text-sm">
                        Our secure tracking system uses GPS technology with
                        minimal battery consumption and strict privacy controls.
                      </p>
                    </div>
                    <div className="p-4">
                      <ul className="space-y-2">
                        <li className="flex items-start">
                          <CheckSquare
                            className="text-green-600 mr-2 mt-1 flex-shrink-0"
                            size={18}
                          />
                          <span>
                            Opt-in feature with explicit caregiver consent
                          </span>
                        </li>
                        <li className="flex items-start">
                          <CheckSquare
                            className="text-green-600 mr-2 mt-1 flex-shrink-0"
                            size={18}
                          />
                          <span>
                            Real-time location updates during scheduled care
                            sessions
                          </span>
                        </li>
                        <li className="flex items-start">
                          <CheckSquare
                            className="text-green-600 mr-2 mt-1 flex-shrink-0"
                            size={18}
                          />
                          <span>
                            Location history stored securely for 30 days
                          </span>
                        </li>
                        <li className="flex items-start">
                          <CheckSquare
                            className="text-green-600 mr-2 mt-1 flex-shrink-0"
                            size={18}
                          />
                          <span>
                            Geofencing alerts if caregiver leaves designated
                            area
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-gray-700 mb-2">
                    Emergency Contact System
                  </h4>
                  <p className="text-gray-600 mb-4">
                    Instant access to emergency contacts and local authorities,
                    with options tailored for Indian cities and towns.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="border border-gray-200 rounded-lg p-4">
                      <h5 className="font-medium text-gray-700 mb-2">
                        One-Tap Emergency Call
                      </h5>
                      <p className="text-gray-600 text-sm">
                        Direct access to local police (100), ambulance
                        (108/102), and our 24/7 support line with single tap.
                      </p>
                    </div>
                    <div className="border border-gray-200 rounded-lg p-4">
                      <h5 className="font-medium text-gray-700 mb-2">
                        Nearest Hospital Alert
                      </h5>
                      <p className="text-gray-600 text-sm">
                        Automatically identifies and provides directions to
                        nearest verified hospitals and clinics.
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-gray-700 mb-2">
                    Safety Check-Ins
                  </h4>
                  <p className="text-gray-600 mb-4">
                    Automated check-ins during care sessions to ensure
                    everything is proceeding safely.
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-3 flex-shrink-0">
                        <AlertCircle className="text-blue-600" size={20} />
                      </div>
                      <div>
                        <h5 className="font-medium text-gray-700 mb-1">
                          Scheduled Check-Ins
                        </h5>
                        <p className="text-gray-600 text-sm">
                          Automatic notifications at predetermined intervals
                          requiring caregiver response.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-3 flex-shrink-0">
                        <Shield className="text-blue-600" size={20} />
                      </div>
                      <div>
                        <h5 className="font-medium text-gray-700 mb-1">
                          Missed Check-In Protocol
                        </h5>
                        <p className="text-gray-600 text-sm">
                          If a check-in is missed, our system escalates through
                          multiple contact methods including SMS and automated
                          calls.
                        </p>
                      </div>
                    </div>
                    <div className="bg-red-50 p-4 rounded-lg">
                      <h5 className="font-medium text-red-700 mb-1">
                        Emergency Escalation
                      </h5>
                      <p className="text-gray-700 text-sm">
                        After 2 missed check-ins, our team contacts emergency
                        contacts and can dispatch local authorities if needed.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "training" && (
              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                <h3 className="text-xl font-bold text-gray-800 mb-4">
                  Training & Compliance
                </h3>

                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-gray-700 mb-2">
                    Mandatory Training Programs
                  </h4>
                  <p className="text-gray-600 mb-4">
                    All caregivers complete comprehensive training programs
                    developed specifically for the Indian caregiving context.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="border border-gray-200 rounded-lg p-4">
                      <h5 className="font-medium text-gray-700 mb-2">
                        Basic Care Certification
                      </h5>
                      <p className="text-gray-600 text-sm">
                        40-hour training covering hygiene, basic first aid,
                        mobility assistance, and communication skills.
                      </p>
                    </div>
                    <div className="border border-gray-200 rounded-lg p-4">
                      <h5 className="font-medium text-gray-700 mb-2">
                        Cultural Sensitivity Training
                      </h5>
                      <p className="text-gray-600 text-sm">
                        Specialized modules on regional customs, dietary
                        restrictions, and family dynamics across India.
                      </p>
                    </div>
                    <div className="border border-gray-200 rounded-lg p-4">
                      <h5 className="font-medium text-gray-700 mb-2">
                        Elderly Care Specialization
                      </h5>
                      <p className="text-gray-600 text-sm">
                        Advanced training for age-related conditions common in
                        Indian elderly populations.
                      </p>
                    </div>
                    <div className="border border-gray-200 rounded-lg p-4">
                      <h5 className="font-medium text-gray-700 mb-2">
                        Child Care Certification
                      </h5>
                      <p className="text-gray-600 text-sm">
                        For caregivers working with children, covering
                        developmental stages and safety protocols.
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-gray-700 mb-2">
                    Ongoing Compliance
                  </h4>
                  <p className="text-gray-600 mb-4">
                    We ensure caregivers maintain high standards through regular
                    assessments and updates.
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-3 flex-shrink-0">
                        <FileCheck className="text-blue-600" size={20} />
                      </div>
                      <div>
                        <h5 className="font-medium text-gray-700 mb-1">
                          Quarterly Refresher Courses
                        </h5>
                        <p className="text-gray-600 text-sm">
                          Mandatory updates on best practices, new techniques,
                          and policy changes.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-3 flex-shrink-0">
                        <Shield className="text-blue-600" size={20} />
                      </div>
                      <div>
                        <h5 className="font-medium text-gray-700 mb-1">
                          Background Check Renewals
                        </h5>
                        <p className="text-gray-600 text-sm">
                          Annual re-verification of all background checks and
                          credentials.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-3 flex-shrink-0">
                        <Star className="text-blue-600" size={20} />
                      </div>
                      <div>
                        <h5 className="font-medium text-gray-700 mb-1">
                          Performance Reviews
                        </h5>
                        <p className="text-gray-600 text-sm">
                          Biannual evaluations based on client feedback and
                          supervisor assessments.
                        </p>
                      </div>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg">
                      <h5 className="font-medium text-green-700 mb-1">
                        Certification Tracking
                      </h5>
                      <p className="text-gray-700 text-sm">
                        Our system automatically tracks expiration dates and
                        notifies caregivers when renewals are needed, ensuring
                        continuous compliance.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Safety;
