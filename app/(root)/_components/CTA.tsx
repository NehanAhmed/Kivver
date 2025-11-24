import { Button } from "@/components/ui/button";

import { Sparkles } from "lucide-react";
import Image from "next/image";

export function CTA() {
  return (
    <section className="py-20 bg-gradient-to-br from-green-500 to-blue-600">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-white space-y-6">
            <div className="flex items-center gap-2">
              <Sparkles className="w-6 h-6" />
              <span className="text-green-100 ">Start Your Journey Today</span>
            </div>
            <h1 className="text-white text-5xl font-semibold">
              Ready to become fluent?
            </h1>
            <p className="text-green-50 text-lg">
              Join millions of learners around the world. Start with our free lessons and upgrade anytime to unlock premium features.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button size="lg" className="bg-white text-green-600 hover:bg-green-50 text-lg py-6 px-8">
                Get Started Free
              </Button>
              <Button size="lg" variant="outline" className="border-2 text-lg py-6 px-8 text-black">
                View Plans
              </Button>
            </div>
            <div className="flex items-center gap-6 pt-4">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="text-white">4.9/5 Rating</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-white">No credit card needed</span>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="bg-white rounded-3xl shadow-2xl p-8">
              <img
                width={100}
                height={400}
                src="https://images.unsplash.com/photo-1614020661483-d2bb855eee1d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBhcHAlMjBwaG9uZXxlbnwxfHx8fDE3NjM5MDQwMzd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Mobile app"
                className="rounded-2xl w-full h-[400px] object-cover"
              />
              <div className="mt-6 space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <span className="text-gray-900">Available on iOS & Android</span>
                  <span className="text-green-600">📱</span>
                </div>
                <div className="flex gap-4">
                  <div className="flex-1 text-center p-3 bg-green-50 rounded-lg">
                    <p className="text-green-600">Desktop</p>
                  </div>
                  <div className="flex-1 text-center p-3 bg-blue-50 rounded-lg">
                    <p className="text-blue-600">Mobile</p>
                  </div>
                  <div className="flex-1 text-center p-3 bg-purple-50 rounded-lg">
                    <p className="text-purple-600">Web</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
