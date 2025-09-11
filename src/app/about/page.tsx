/* eslint-disable @next/next/no-img-element */
import MarkdownRenderer from "@/components/MarkdownRenderer/page";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Github, Linkedin } from "lucide-react";
import Link from "next/link";


const aboutMd = `
## About Me  

Hi 👋 I’m **Ankit Yadav** (also known as **Zack Sir**).  

I’m a developer and entrepreneur passionate about building impactful projects.  
Some of the things I’ve worked on:  

- 🚚 **Drop-N-Go**: A delivery platform with scheduled deliveries.  
- 🛍️ **Amoghastyle**: My own brand selling pendants, Rudraksha beads & bracelets.  
- 💻 Freelance projects: Shopify clothing stores, custom payment systems, and full-stack apps.  

I’m aiming to scale my startups, explore cutting-edge tech, and achieve financial independence 🚀.  
`;

export default function AboutPage() {
  const me = {
    name: "Ankit Yadav",
    linkedIn: "https://www.linkedin.com/in/theminacious", 
    github: "https://github.com/theminacious",
    image: "/images/ankit.jpg", 
  };

  return (
    <div className="w-full flex flex-col items-center gap-5 p-4">
      {/* Logo + Home Link */}
      <Link href="/" className="flex items-center gap-1 mr-auto z-40">
        <img src="/images/Logo.png" alt="Quiz Sensei Logo" className="w-[55px]" />
        <span className="font-bold">Quiz Sensei</span>
      </Link>

      <div className="w-full flex flex-col items-center gap-5 max-w-[1000px]">
        <div className="w-full">
          <MarkdownRenderer markdown={"## Meet the Developer"} />
        </div>

        {/* Card with your details */}
        <div className="flex flex-wrap w-full gap-5 justify-center my-5">
          <Card className="w-full max-w-[350px] p-4 flex flex-col gap-2">
            <Avatar className="rounded w-full h-full aspect-square object-fill max-h-[300px] max-w-[300px]">
              <AvatarImage
                src={me.image}
                alt={me.name}
                className="aspect-square max-h-[300px] max-w-[300px]"
              />
            </Avatar>

            <h4 className="font-semibold text-lg">{me.name}</h4>

            <div className="flex items-center gap-2">
              <a href={me.linkedIn} target="_blank" rel="noopener noreferrer">
                <Badge className="flex items-center gap-1 w-fit text-white">
                  <Linkedin size={14} />
                  <span>LinkedIn</span>
                </Badge>
              </a>
              <a href={me.github} target="_blank" rel="noopener noreferrer">
                <Badge className="flex items-center gap-1 w-fit bg-neutral-800 text-white hover:bg-neutral-900">
                  <Github size={14} />
                  <span>GitHub</span>
                </Badge>
              </a>
            </div>
          </Card>
        </div>

        {/* Markdown bio */}
        <div className="mt-10">
          <MarkdownRenderer markdown={aboutMd} />
        </div>
      </div>
    </div>
  );
}
