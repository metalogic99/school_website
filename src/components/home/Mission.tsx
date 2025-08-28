import React from "react";
import { H1, P, H3 } from "../typography";
import Image from "next/image";
import { Card, CardHeader, CardTitle, CardDescription } from "../ui/card";

const data = {
  en: [
    {
      image: "/home/mission/social.svg",
      title: "Social Impact",
      description:
        "We believe that everyone deserves access to affordable financial services. We are dedicated to breaking down barriers within our cooperative and providing inclusive financial solutions to all members of our community.",
    },

    {
      image: "/home/mission/inclusion.svg",
      title: "Financial Inclusion",
      description:
        "We are more than just a financial institution; we actively contribute to the prosperity of the communities we serve. Through various initiatives and partnerships, we aim to make a positive and lasting impact on the lives of our members.",
    },

    {
      image: "/home/mission/empower.svg",
      title: "Member Empowerment ",
      description:
        "Your financial success is our priority. We are committed to empowering our members by offering personalized services, competitive rates, and resources that enhance financial literacy. At Satalok, your goals are our goals.",
    },
  ],
  np: [
    {
      image: "/home/mission/social.svg",
      title: "सामुदायिक प्रभाव",
      description:
        "हामी विश्वास गर्छौं कि सबैजना किफायती वित्तीय सेवाहरूमा पहुँचको योग्य छन्। हाम्रो सहकारी बाधाहरू तोड्न र हाम्रो समुदायका सबै सदस्यहरूलाई समावेशी वित्तीय समाधानहरू प्रदान गर्न समर्पित छ।",
    },

    {
      image: "/home/mission/inclusion.svg",
      title: "वित्तीय समावेशीकरण",
      description:
        "हामी वित्तीय संस्था मात्र होइनौं; हामीले सेवा गर्ने समुदायको समृद्धिमा हामी सक्रिय रूपमा योगदान गर्छौं। विभिन्न पहल र साझेदारीहरू मार्फत, हामी हाम्रा सदस्यहरूको जीवनमा सकारात्मक र दिगो प्रभाव पार्ने लक्ष्य राख्छौं।",
    },

    {
      image: "/home/mission/empower.svg",
      title: "सदस्य सशक्तिकरण",
      description:
        "तपाईको आर्थिक सफलता हाम्रो प्राथमिकता हो। हामी व्यक्तिगत सेवाहरू, प्रतिस्पर्धी दरहरू, र वित्तीय साक्षरता बढाउने स्रोतहरू प्रदान गरेर हाम्रा सदस्यहरूलाई सशक्त बनाउन प्रतिबद्ध छौं। सतालोकमा, तपाईको लक्ष्य हाम्रो लक्ष्य हो।",
    },
  ],
};

export const Mission = ({ lang }: { lang: string }) => {
  return (
    <section
      style={{
        background:
          "url(/home/mission/left.svg) no-repeat top left / 15% auto, url(/home/mission/right.svg) no-repeat top right / 15% auto, url(/home/mission/dots.svg) no-repeat 95% 55%",
      }}
    >
      <div className="space-y-4 bg-white py-20 text-center md:bg-transparent">
        <H3 className="font-bold text-red-600">हाम्रो प्रतिबद्धता</H3>
        <H1>हामी विश्वास गर्छौं</H1>
        <P>
          वित्तीय समावेशीकरणलाई सशक्त बनाउने, सामुदायिक वृद्धिलाई प्रोत्साहन
          गर्ने र सदस्य सशक्तिकरणलाई प्राथमिकता दिने
        </P>

        <div className="grid place-items-center  gap-y-8 sm:grid-cols-2 md:pt-20 lg:mx-auto lg:w-3/4 lg:grid-cols-3">
          {data[lang as keyof typeof data].map((d: any, idx: number) => (
            <Card key={idx} className="w-[300px] bg-primary-100 py-10">
              <CardHeader className="flex items-center">
                <Image
                  src={d.image}
                  alt="social image my-8"
                  width={100}
                  height={100}
                />
                <CardTitle className="text-xl">{d.title}</CardTitle>
                <CardDescription>{d.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
