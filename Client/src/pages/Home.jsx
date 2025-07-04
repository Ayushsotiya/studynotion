import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight } from "react-icons/fa";
import Highlighttext from '../components/core/HomePage/HighlightText';
import CTAButton from '../components/core/HomePage/CTAButton';
import Banner from "../assets/Images/banner.mp4";
import CodeBlocks from "../components/core/HomePage/CodeBlocks";
import TimelineSection from "../components/core/HomePage/TimelineSection"

import LearningLanguageSection from '../components/core/HomePage/LearningLanguageSection';
import InstructorSection from "../components/core/HomePage/InstructorSection"
import Footer from "../components/common/Footer";
import ReviewSlider from "../components/common/ReviewSlider";
import ExploreMore from "../components/core/HomePage/ExploreMore"

const Home = () => {
  return (
    <div>
      {/* section 1  */}
      <div className='relative mx-auto flex flex-col w-11/12 max-w-maxContent items-center text-white justify-between '>
        <Link to={"signup"}>
          <div className='group mt-16 p-1 mx-auto rounded-full bg-richblack-800 font-bold text-richblack-200 transition-all duration-200 hover:scale-95 w-fit'>
            <div className='flex flex-row items-center gap-2 rounded-full px-10 py-[5px] transition-all duration-200 group-hover:bg-richblack-900'>
              <p>Become a Instructor </p>
              <FaArrowRight />
            </div>
          </div>
        </Link>
        <div className='text-center text-4xl font-semibold mt-7' >Empower Your Fututre with <Highlighttext text={"Coding skills"} /></div>
        <div className='w-[90%] text-center text-lg font-bold  text-rich-300 mt-3 '>
          With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects,quizzes, andpersonalized feedback  from Instructor
        </div>
        <div className=' flex flex-row gap-7 mt-8'>
          <CTAButton active={true} linkto={"/signup"}>Learn More</CTAButton>
          <CTAButton active={false} linkto={"/login"}>Book a demo</CTAButton>
        </div>
        <div className="mx-3 my-7 shadow-[10px_-5px_50px_-5px] shadow-blue-200 w-[50vw] ">
          <video
            className="shadow-[20px_20px_rgba(255,255,255)] h-[100%] w-[100%]"
            muted
            loop
            autoPlay
          >
            <source src={Banner} type="video/mp4" />
          </video>
        </div>
        <div>
          <CodeBlocks
            position={"lg:flex-row"}
            heading={
              <div className="text-4xl font-semibold">
                Unlock your
                <Highlighttext text={"coding potential"} /> with our online
                courses.
              </div>
            }
            subheading={
              "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
            }
            ctabtn1={{
              btnText: "Try it Yourself",
              link: "/signup",
              active: true,
            }}
            ctabtn2={{
              btnText: "Learn More",
              link: "/signup",
              active: false,
            }}
            codeColor={"text-yellow-25"}
            codeblock={`<!DOCTYPE html>\n <html lang="en">\n<head>\n<title>This is myPage</title>\n</head>\n<body>\n<h1><a href="/">Header</a></h1>\n<nav> <a href="/one">One</a> <a href="/two">Two</a> <a href="/three">Three</a>\n</nav>\n</body>`}
            backgroundGradient={<div className="codeblock1 absolute"></div>}
          />
        </div>
        <div>
          <CodeBlocks
            position={"lg:flex-row-reverse"}
            heading={
              <div className="w-[100%] text-4xl font-semibold lg:w-[50%]">
                Start
                <Highlighttext text={"coding in seconds"} />
              </div>
            }
            subheading={
              "Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."
            }
            ctabtn1={{
              btnText: "Continue Lesson",
              link: "/signup",
              active: true,
            }}
            ctabtn2={{
              btnText: "Learn More",
              link: "/signup",
              active: false,
            }}
            codeColor={"text-white"}
            codeblock={`import React from "react";\n import CTAButton from "./Button";\nimport TypeAnimation from "react-type";\nimport { FaArrowRight } from "react-icons/fa";\n\nconst Home = () => {\nreturn (\n<div>Home</div>\n)\n}\nexport default Home;`}
            backgroundGradient={<div className="codeblock2 absolute"></div>}
          />
        </div>

        {/* Explore Section */}
        <ExploreMore />
      </div>
      {/* section 2  */}
      <div className='bg-pure-greys-5 text-richblack-700'>
        <div className='homepage_bg h-[333px]'>
          <div className='w-11/12 max-w-content flex flex-col items-center gap-5 mx-auto'>
            <div className='h-[150px]'></div>
            <div className='flex flex-row gap-7 text-white'>
              <CTAButton active={true} linkto={"/signup"}><div className='flex items-center gap-3'>Explore Full catalog<FaArrowRight /> </div></CTAButton>
              <CTAButton active={false} linkto={"signup"}><div>Learn more</div></CTAButton>
            </div>

          </div>

        </div>

        <div className='mx-auto max-w-content flex flex-col items-center justify-center w-11/12 gap-7'>
          <div className='flex flex-row gap-5 mb-10 mt-[95px]'>
            <div className='text-4xl font-semibold w-[45%]'>Get the skills you need for a <Highlighttext text={"Job that is in a demand"}></Highlighttext></div>

            <div className='flex flex-col gap-10 w-[40%] items-start'>
              <div className='text-[16px]'>
                The modern studynotion is the dectates its own terms .todat to be competitive specialist requires more than professional skills
              </div>
              <CTAButton active={true} linkto={"signup"}><div>Learn more</div></CTAButton>
            </div>
          </div>
          <TimelineSection />
          <LearningLanguageSection />
        </div>
      </div>
      {/* section 3  */}
      <div className="relative mx-auto my-20 flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8 bg-richblack-900 text-white">
        {/* Become a instructor section */}
        <InstructorSection />

        {/* Reviws from Other Learner */}

        {/* <ReviewSlider /> */}

      </div>
      <div className="relative mx-auto my-20 flex w-11/12 max-w-maxContent flex-col  gap-8 bg-richblack-900 text-white">
        {/* Reviews from Other Learner */}
        <h1 className="text-center text-4xl font-semibold mt-8">
          Reviews from other learners
        </h1>
        < ReviewSlider />
        
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default Home;
