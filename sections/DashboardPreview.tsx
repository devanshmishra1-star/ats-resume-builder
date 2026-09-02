import { ShieldCheck, Download, Smartphone } from "lucide-react";
import { SectionHeader } from "@/components/SectionHeader";

export function DashboardPreview() {
  return (
    <section className="content-section" id="dashboard-preview">
      <div className="container">
        <SectionHeader
          kicker="The Workspace"
          title="A clutter-free, real-time environment."
          copy="See exactly what your recruiter sees. No more guessing how your resume will look after you hit export."
        />
        
        <div className="relative mx-auto max-w-6xl rounded-xl border border-gray-200/20 bg-[#f9fafb] p-2 shadow-2xl overflow-hidden ring-1 ring-gray-900/5">
          {/* Mac window header */}
          <div className="flex items-center gap-1.5 px-3 py-2 border-b border-gray-200">
            <div className="h-3 w-3 rounded-full bg-red-400"></div>
            <div className="h-3 w-3 rounded-full bg-amber-400"></div>
            <div className="h-3 w-3 rounded-full bg-green-400"></div>
            <div className="flex-1 text-center">
              <div className="inline-flex items-center gap-1.5 rounded-md bg-gray-100 px-3 py-1 text-xs font-medium text-gray-500">
                <ShieldCheck size={12} />
                atsresumebuilder.co.in/builder
              </div>
            </div>
          </div>
          
          {/* Dashboard UI Recreation (Crisp HTML/CSS) */}
          <div className="flex h-[700px] w-full flex-col md:flex-row bg-[#f3f4f6]">
            
            {/* Left Sidebar Form Mockup */}
            <div className="w-full md:w-[380px] shrink-0 flex flex-col bg-white border-r border-gray-200 overflow-hidden text-left overflow-y-auto custom-scrollbar">
              
              {/* Header Box */}
              <div className="p-4 border-b border-gray-100">
                <div className="bg-gray-50 rounded-xl p-3 flex items-center justify-between border border-gray-200 shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="bg-gray-900 p-2 rounded-lg">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="9" y1="9" x2="15" y2="9"></line><line x1="9" y1="15" x2="15" y2="15"></line></svg>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 text-[13px] leading-tight">Resume Builder — LPU</h4>
                      <div className="text-[10px] text-gray-500 font-medium mt-0.5">B.Tech / MCA / BCA</div>
                    </div>
                  </div>
                  <button className="bg-gray-900 text-white text-[10px] font-bold px-3 py-2 rounded-lg hover:bg-gray-800 transition-colors shadow-sm">
                    Export PDF
                  </button>
                </div>
              </div>

              {/* Mobile App Promo */}
              <div className="p-4 border-b border-gray-100 bg-gradient-to-r from-orange-50/50 to-amber-50/50">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="text-[9px] font-bold text-orange-500 uppercase tracking-wider mb-1">Now on Android</div>
                    <h5 className="text-[12px] font-bold text-gray-900 leading-tight mb-1">Build resumes faster on the mobile app.</h5>
                    <p className="text-[9px] text-gray-600 leading-relaxed max-w-[180px]">Download the official ATS Resume Builder app from Google Play when the store link is connected.</p>
                  </div>
                  <div className="bg-gray-900 text-white text-[9px] font-bold px-2 py-1.5 rounded flex items-center gap-1.5 shrink-0 mt-2">
                    <Smartphone size={12} /> Google Play
                  </div>
                </div>
              </div>

              {/* Ad Space */}
              <div className="p-4 pb-2 border-b border-gray-100">
                <div className="border border-dashed border-gray-300 rounded-lg p-4 flex items-center justify-center bg-gray-50/50">
                  <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Advertisement Space</span>
                </div>
              </div>

              {/* Tabs */}
              <div className="p-4 pb-2">
                <div className="flex flex-wrap gap-2">
                  <div className="bg-gray-900 text-white text-[11px] font-semibold px-4 py-1.5 rounded-md shadow-sm border border-gray-900">Personal</div>
                  <div className="bg-white text-gray-600 text-[11px] font-medium px-4 py-1.5 rounded-md border border-gray-200">Experience</div>
                  <div className="bg-white text-gray-600 text-[11px] font-medium px-4 py-1.5 rounded-md border border-gray-200 shadow-sm ring-1 ring-blue-500/20 text-blue-600">Projects</div>
                  <div className="bg-white text-gray-600 text-[11px] font-medium px-4 py-1.5 rounded-md border border-gray-200">Certificates</div>
                  <div className="bg-white text-gray-600 text-[11px] font-medium px-4 py-1.5 rounded-md border border-gray-200">Skills</div>
                  <div className="bg-white text-gray-600 text-[11px] font-medium px-4 py-1.5 rounded-md border border-gray-200">Education</div>
                </div>
              </div>

              {/* Form Fields */}
              <div className="p-4 pt-2 space-y-4">
                <h4 className="font-bold text-gray-800 text-[13px] uppercase tracking-wide border-b border-gray-100 pb-2">Personal</h4>
                
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[9px] uppercase font-bold text-gray-500 mb-1 block">First Name</label>
                    <div className="border border-gray-300 rounded p-2 text-xs font-medium text-gray-900 bg-white">First</div>
                  </div>
                  <div>
                    <label className="text-[9px] uppercase font-bold text-gray-500 mb-1 block">Last Name</label>
                    <div className="border border-gray-300 rounded p-2 text-xs font-medium text-gray-900 bg-white">Last</div>
                  </div>
                </div>

                <div>
                  <label className="text-[9px] uppercase font-bold text-gray-500 mb-1 block">Location</label>
                  <div className="border border-gray-300 rounded p-2 text-xs font-medium text-gray-900 bg-white">Mathura, Uttar Pradesh 281001</div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[9px] uppercase font-bold text-gray-500 mb-1 block">Phone</label>
                    <div className="border border-gray-300 rounded p-2 text-xs font-medium text-gray-900 bg-white">+91 1234567890</div>
                  </div>
                  <div>
                    <label className="text-[9px] uppercase font-bold text-gray-500 mb-1 block">Email</label>
                    <div className="border border-gray-300 rounded p-2 text-xs font-medium text-gray-900 bg-white">sXXXXXXXXX@gmail.com</div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[9px] uppercase font-bold text-gray-500 mb-1 block">LinkedIn</label>
                    <div className="border border-gray-300 rounded p-2 text-[11px] font-medium text-gray-900 bg-white truncate">linkedin.com/in/sXXXXXXXXX</div>
                  </div>
                  <div>
                    <label className="text-[9px] uppercase font-bold text-gray-500 mb-1 block">GitHub</label>
                    <div className="border border-gray-300 rounded p-2 text-[11px] font-medium text-gray-900 bg-white truncate">github.com/sxxx-cce12/</div>
                  </div>
                </div>

                <div>
                  <label className="text-[9px] uppercase font-bold text-gray-500 mb-1 block">GitHub Note</label>
                  <div className="border border-gray-300 rounded p-2 text-xs font-medium text-gray-900 bg-white">for coders</div>
                </div>

                <div className="flex justify-end pt-2 pb-6">
                  <button className="bg-gray-900 text-white text-xs font-bold px-6 py-2 rounded shadow-sm hover:bg-gray-800">
                    Next
                  </button>
                </div>
              </div>
            </div>
            
            {/* Right Side A4 Preview Mockup */}
            <div className="flex-1 bg-[#e5e7eb] p-4 md:p-8 flex items-start justify-center overflow-auto custom-scrollbar relative">
              
              {/* Actual A4 Page Mockup */}
              <div className="w-[500px] min-h-[707px] bg-white shadow-xl flex flex-col shrink-0 relative mb-8">
                
                <div className="w-full h-full p-8 font-sans flex flex-col">
                  {/* Header */}
                  <div className="text-center mb-3">
                    <h1 className="text-[18px] font-serif font-bold text-black leading-tight tracking-tight">First Last</h1>
                    <p className="text-[9px] text-gray-800 mt-0.5">Mathura, Uttar Pradesh 281001</p>
                    <div className="flex items-center justify-center gap-3 text-[8px] mt-1.5 font-medium text-gray-900">
                      <span><b className="font-bold">P</b> +91 1234567890</span>
                      <span><b className="font-bold">E</b> sXXXXXXXXX@gmail.com</span>
                      <span><b className="font-bold">in</b> linkedin.com/in/sXXXXXXXXX</span>
                      <span><b className="font-bold">G</b> github.com/sxxx-cce12/</span>
                    </div>
                  </div>

                  {/* Internship */}
                  <div className="mb-3">
                    <h2 className="text-[11px] font-serif font-bold uppercase border-b border-black pb-[2px] mb-1 text-black">Internship</h2>
                    <div className="flex justify-between items-baseline mb-[1px]">
                      <div className="text-[10px]"><span className="font-bold text-black">SEPI Intern</span> <span className="italic text-gray-700">| Tableau, SAP, DNS, SSL Certification, CNAME</span></div>
                      <div className="text-[9px] font-bold text-black">May 2023 - Jul 2023</div>
                    </div>
                    <div className="text-[9px] font-semibold italic text-gray-800 mb-1">JP Morgan Chase & Co.</div>
                    <ul className="list-disc pl-4 text-[9px] text-black space-y-[2px]">
                      <li>Contributed to the advancement of the organization's robust Document Manager web application.</li>
                      <li>Improved user experience and productivity by implementing comprehensive row grouping, column filtering, and data filtering functionality...</li>
                      <li>Enhanced application performance, improved records' load time, and increased overall efficiency by implementing server-side pagination...</li>
                      <li>Wrote Angular unit test cases using the Jasmine framework to validate the responsiveness of the grid on different resolutions.</li>
                    </ul>

                    <div className="flex justify-between items-baseline mt-2 mb-[1px]">
                      <div className="text-[10px]"><span className="font-bold text-black">Full Stack Web Developer Intern</span> <span className="italic text-gray-700">| Tableau, SAP, DNS, SSL Certification, CNAME</span></div>
                      <div className="text-[9px] font-bold text-black">Feb 2022 - Aug 2022</div>
                    </div>
                    <div className="text-[9px] font-semibold italic text-gray-800 mb-1">edureka</div>
                    <ul className="list-disc pl-4 text-[9px] text-black space-y-[2px]">
                      <li>Built two dynamic web applications, Flipkart Clone and Zomato Clone, leveraging the power of the MERN stack.</li>
                      <li>Automated web data collection through software tools and custom scripts, streamlining repetitive tasks effectively.</li>
                    </ul>
                  </div>

                  {/* Projects */}
                  <div className="mb-3">
                    <h2 className="text-[11px] font-serif font-bold uppercase border-b border-black pb-[2px] mb-1 text-black">Projects</h2>
                    <div className="flex justify-between items-baseline mb-[1px]">
                      <div className="text-[10px]"><span className="font-bold text-black">Fkart App</span> <span className="italic text-gray-700">| MERN Stack, Responsive Web Design</span></div>
                      <div className="text-[9px] font-bold text-black">Jul 2022 - Aug 2022</div>
                    </div>
                    <ul className="list-disc pl-4 text-[9px] text-black space-y-[2px]">
                      <li>Developed an e-commerce platform wherein users can buy numerous products such as electronics, clothing, and more.</li>
                      <li>It offers dynamic data from MongoDB, responsive design, dynamic pagination based on data, and developer REST APIs...</li>
                      <li>Applied MERN stack knowledge successfully to create a fully functional MERN stack website.</li>
                      <li>Repository Link: https://github.com/suraj-singh12/flipkart-project</li>
                    </ul>

                    <div className="flex justify-between items-baseline mt-2 mb-[1px]">
                      <div className="text-[10px]"><span className="font-bold text-black">Project SearchEverywhere</span> <span className="italic text-gray-700">| Python3, Linux, Grep, Open Office, Bash, MS Office</span></div>
                      <div className="text-[9px] font-bold text-black">Feb 2021 - Mar 2023</div>
                    </div>
                    <ul className="list-disc pl-4 text-[9px] text-black space-y-[2px]">
                      <li>Designed an open-source Linux tool that allows users to search for specific information in multiple file types...</li>
                      <li>This is an enhancement to the 'grep' command on Linux systems which only allows searching in text files only.</li>
                      <li>Used extensively by students for preparation of university exams during COVID-19 times.</li>
                      <li>Repository Link: https://github.com/suraj-singh12/Project-SearchEverywhere</li>
                    </ul>
                  </div>

                  {/* Certificates */}
                  <div className="mb-3">
                    <h2 className="text-[11px] font-serif font-bold uppercase border-b border-black pb-[2px] mb-1 text-black">Certificates</h2>
                    <div className="flex justify-between items-baseline mb-[1px]">
                      <div className="text-[10px] font-bold text-black">Full Stack Web Development</div>
                      <div className="text-[9px] font-bold text-black">Aug 2022</div>
                    </div>
                    <div className="text-[9px] italic text-gray-800 mb-[2px]">edureka - Certificate Link</div>
                    <ul className="list-disc pl-4 text-[9px] text-black space-y-[2px]">
                      <li>Completed full stack web development certification.</li>
                    </ul>

                    <div className="flex justify-between items-baseline mt-1.5 mb-[1px]">
                      <div className="text-[10px] font-bold text-black">Linux for Developers</div>
                      <div className="text-[9px] font-bold text-black">Mar 2021</div>
                    </div>
                    <div className="text-[9px] italic text-gray-800 mb-[2px]">Coursera - Certificate Link</div>
                    <ul className="list-disc pl-4 text-[9px] text-black space-y-[2px]">
                      <li>Completed Linux developer certification.</li>
                    </ul>
                  </div>

                  {/* Skills */}
                  <div className="mb-3">
                    <h2 className="text-[11px] font-serif font-bold uppercase border-b border-black pb-[2px] mb-1 text-black">Skills</h2>
                    <div className="text-[9px] text-black mb-[2px]"><span className="font-bold">Languages:</span> C++, Java, JavaScript</div>
                    <div className="text-[9px] text-black mb-[2px]"><span className="font-bold">Technologies/Frameworks:</span> Angular, Jasmine Testing, React JS, Node JS, Git, Github, Ubuntu</div>
                    <div className="text-[9px] text-black"><span className="font-bold">Domain Skills:</span> Data Structures and Algorithms, Problem-Solving, Responsive Web Design, Scripting in Python and JavaScript</div>
                  </div>

                  {/* Education */}
                  <div>
                    <h2 className="text-[11px] font-serif font-bold uppercase border-b border-black pb-[2px] mb-1 text-black">Education</h2>
                    <div className="flex justify-between items-baseline mb-[1px]">
                      <div className="text-[10px] font-bold text-black">Lovely Professional University</div>
                      <div className="text-[9px] font-bold text-black">2020 - 2024</div>
                    </div>
                    <div className="flex justify-between items-baseline mb-1.5">
                      <div className="text-[9px] italic text-gray-800">Bachelor of Technology - Computer Science and Engineering - CGPA: 8.23</div>
                      <div className="text-[8px] italic text-gray-600">Phagwara, Punjab</div>
                    </div>
                    
                    <div className="flex justify-between items-baseline mb-[1px]">
                      <div className="text-[10px] font-bold text-black">Kendriya Vidyalaya Mathura Cantt</div>
                      <div className="text-[9px] font-bold text-black">2018 - 2019</div>
                    </div>
                    <div className="flex justify-between items-baseline mb-1.5">
                      <div className="text-[9px] italic text-gray-800">12th - Percentage: 94.60%</div>
                      <div className="text-[8px] italic text-gray-600">Mathura, Uttar Pradesh</div>
                    </div>
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
