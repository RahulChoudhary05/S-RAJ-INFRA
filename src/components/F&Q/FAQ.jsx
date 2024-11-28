import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import { Card, CardContent } from "./ui/card";

export default function ModernFAQ() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-richblack-5 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight text-backgroundblack sm:text-5xl md:text-6xl">
            FAQ
          </h1>
          <div className="prose prose-lg mx-auto text-zinc-800 font-playfair font-semibold">
            <p className="leading-normal">
              Our time is now. We are on a continuous journey of growth;
              developing our brands, building on our assets, and expanding our
              distribution reach systems. Our focus is on leveraging our
              strengths to become one of the most successful companies in the
              region. The strong commitment of our people across the
              organization fuels us forward. We're looking for talented people
              who share our core values and are ready to make a difference.
              Bring your spark to our corporate office and make an impact in
              the business world.
            </p>
          </div>
        </div>

        {/* FAQ Accordion */}
        <Card className="border-none shadow-xl">
          <CardContent className="p-0">
            <Accordion type="single" collapsible className="w-full">
              {/* What We Look For Section */}
              <AccordionItem value="what-we-look-for" className="border-spacing-6">
                <AccordionTrigger className="bg-gradient-to-r from-blue-25 to-richblack-5 text-black px-6 py-4 hover:no-underline data-[state=open]:bg-gradient-to-r data-[state=open]:from-richblack-5 data-[state=open]:to-blue-25 rounded-t-lg">
                  <span className="text-xl font-semibold font-inter">What we look for</span>
                </AccordionTrigger>
                <AccordionContent className="bg-transparent px-6 py-4 space-y-6">
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold text-richblack-800 font-playfair">
                        Your tangible impact
                      </h3>
                      <p className="text-richblack-900 font-medium">
                        We want to see the positive difference that you make to
                        our organization.
                      </p>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold text-richblue-800 font-playfair">
                        Creative and fresh thinking
                      </h3>
                      <p className="text-richblack-900 font-medium">
                        Regardless of your role we require someone who can
                        bring new thinking to make things more effective for the
                        team.
                      </p>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold text-richblue-800 font-playfair">
                        Team spirit
                      </h3>
                      <p className="text-richblack-900 font-medium">
                        We need someone who thrives when collaborating with a
                        diverse range of people with different views,
                        perspectives and priorities.
                      </p>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold text-richblue-800 font-playfair">
                        Positivity and determination
                      </h3>
                      <p className="text-richblack-900 font-medium">
                        We are looking for motivated people who like to take
                        initiative in every aspect of their work.
                      </p>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold text-richblue-800 font-playfair">
                        A pragmatic and professional mindset
                      </h3>
                      <p className="text-richblack-900 font-medium">
                        We encourage people who understand the challenges of
                        value creation and sustainable growth.
                      </p>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold text-richblue-800 font-playfair">
                        A willingness to embrace our philosophy
                      </h3>
                      <p className="text-richblack-900 font-medium">
                        We are looking for people who can bring our values and
                        philosophy into their own work process.
                      </p>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* What We Offer Section */}
              <AccordionItem value="what-we-offer" className="border-none">
                <AccordionTrigger className="bg-gradient-to-r from-blue-25 to-richblack-5 text-black px-6 py-4 hover:no-underline data-[state=open]:bg-gradient-to-r data-[state=open]:from-richblack-5 data-[state=open]:to-blue-25">
                  <span className="text-xl font-semibold font-inter">What we offer</span>
                </AccordionTrigger>
                <AccordionContent className="bg-transparent px-6 py-4 space-y-6 rounded-b-lg">
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold text-richblue-800 font-playfair">
                        The challenge of meaningful work
                      </h3>
                      <p className="text-richblack-900 font-medium">
                        Our dynamic workplace gives all employees an
                        interesting and rewarding role. You will be working
                        with a team of people who are committed to meeting the
                        business objectives.
                      </p>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold text-richblue-800 font-playfair">
                        The chance to grow and develop
                      </h3>
                      <p className="text-richblack-900 font-medium">
                        Our diversified business portfolio offers the exciting
                        opportunity to move across various industries and add
                        to your skillset.
                      </p>
                    </div>

                    <div className="space-y-2 sm:col-span-2">
                      <h3 className="text-lg font-semibold text-richblue-800 font-playfair ">
                        A healthy work-life balance
                      </h3>
                      <p className="text-richblack-900 font-medium">
                        At S Raj Infra Projects we nurture our people and allow
                        them to enjoy family life and all that the country has
                        to offer.
                      </p>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
