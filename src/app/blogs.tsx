import { CalendarIcon, ClockIcon, X } from "lucide-react";
import { useState, useRef, useEffect } from "react";

interface BlogPost {
  id: string;
  title: string;
  date: string;
  readTime: string;
  excerpt: string;
  content: string;
  imageUrl?: string;
  imageAlt?: string;
}

const blogPosts: BlogPost[] = [  
  {
    id: "1",
    title: "I Started to do LeetCode as a Data Science Student",
    date: "May 28, 2025",
    readTime: "10 min read",
    excerpt: "As a data science student, I thought I could skip the traditional coding interviews. I was wrong. Here's why I finally picked up LeetCode and what I'm learning along the way.",
    imageUrl: "/images/blogs/lc.jpeg", 
    imageAlt: "LeetCode practice and coding challenges",
    content: `
      <h4>TLDR: Started doing LeetCode because problem-solving skills are valuable.</h4>
      <p>For the longest time, I thought LeetCode was just for software engineers. As a data science student, I figured my path would be different and focus more on statistics and machine learning. Why would I need to solve algorithm puzzles when I'm building predictive models?</p>
      
      <p>In New Zealand, data science roles often require a lot of years in experience. And for a grad like me to get into that, it is indeed very difficult. More importantly, I realized that strong problem-solving skills are also universal for any roles.</p>
            
      <p>The job market is competitive, and having options is crucial. Many companies, even for data science roles, include algorithmic thinking in their interview process. I want to be prepared for whatever comes my way.</p>
      
      <p>This was the bigger motivator for me. I sometimes struggled to break them down systematically. LeetCode forces you to think step-by-step and consider edge cases, these skills could directly translate to any type of work.</p>
      
      <p>There are days when I look at a medium-level problem and feel completely lost. The jump from easy to medium feels massive sometimes. Dynamic programming problems still make me second-guess myself constantly.</p>
      
            
        `
  },
    {
    id: "2",
    title: "The Reality of Data Science",
    date: "May 28, 2025",
    readTime: "8 min read",
    excerpt: "After my internship at NZTA and countless university projects, I've learned that data science isn't what they show you in movies. Here's the real breakdown of what you'll actually be doing as a data scientist",
    imageUrl: "/images/blogs/data.jpg",
    imageAlt: "Data science workflow visualization",
    content: `
      <h4>TLDR: Data science work is 80% data cleaning and only 20% actual modeling</h4>
      <p>Data science is often portrayed as this glamorous field where you build amazing machine learning models and uncover groundbreaking insights. While that's partially true, the reality is quite different.</p>
      
      <p>After spending countless hours on university projects and a last year internship at NZTA, I've learned that the majority of data science work involves cleaning and preparing data. It's not the most exciting part, but it's absolutely crucial.</p>
  
  <h3>The 80% - Data Cleaning</h3>
  <p>Most of your time will be spent:</p>
  <ul>
    <li>Handling missing values and outliers</li>
    <li>Standardizing data formats</li>
    <li>Merging datasets from different sources</li>
    <li>Feature engineering and selection</li>
  </ul>

  <p>Real-world data is messy. You'll encounter missing entries, invalid values (like negative frequencies), and outliers that could skew your entire analysis. Ever tried to merge datasets where dates are formatted differently in each file?</p>

  <p>In the real world, your data rarely comes from a single, clean source. You'll pull information from multiple systems that don't always play nicely together. Getting these to work together is very time consuming.</p>
  
  <h3>The 20% - The Glory</h3>
  <p>This is where the magic happens - building models, analyzing results, and extracting insights that can drive real business decisions. You'll experiment with different algorithms, fine-tune parameters, and create visualizations that tell stories.</p>
  
  <p>Perhaps the most rewarding part is translating your findings into actionable insights. Your customer churn model helps retain valuable customers. Your forecasting algorithm optimizes operations. This 20% is where you see the real impact of your work.</p>
  
  <p>Initially, I was disappointed at first, I wanted to jump straight into building neural networks and complex models. But I've come to appreciate why data preparation is so crucial:</p>
  
  <p>No amount of sophisticated modeling can compensate for poor-quality data. The time you invest in cleaning and understanding your data directly impacts the reliability of your insights.</p>
  
  <p>During the data cleaning process, you become intimately familiar with the business domain. You understand the nuances and context that inform better modeling decisions.</p>
  
  <h3>The Bottom Line</h3>
  <p>Data science isn't just about building models—it's about extracting reliable insights from imperfect information. The 80% spent on data preparation isn't a necessary evil, it's the foundation that makes the 20% of "glory" work possible.</p>
  
  <p>University teaches you the algorithms and theory, but the real world teaches you that communication, and data quality are just as important.</p>
  `
  },
];

interface BlogModalProps {
  post: BlogPost | null;
  isOpen: boolean;
  onClose: () => void;
}

function BlogModal({ post, isOpen, onClose }: BlogModalProps) {
  if (!isOpen || !post) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/70 backdrop-blur-md animate-in fade-in duration-300"
      style={{
        animation: 'fadeIn 0.3s ease-out forwards'
      }}
    >
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />      <div 
        className="relative w-full max-w-[50vw] max-h-[60vh] flex flex-col bg-background border border-border rounded-lg shadow-xl overflow-hidden transform transition-all duration-500 ease-out animate-in zoom-in-95 slide-in-from-bottom-4 fade-in"
        style={{ 
          boxShadow: '0 0 20px 3px rgba(255, 255, 255, 0.12), 0 25px 50px -12px rgba(0, 0, 0, 0.3)',
          animation: 'modalPop 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards'
        }}
      >
        {/* Top right close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-10 p-2 bg-background/70 hover:bg-background/90 rounded-full text-muted-foreground hover:text-primary transition-all duration-300 hover:scale-105 active:scale-95"
          aria-label="Close blog post"
        >
          <X className="w-5 h-5" />
        </button>        <div className="flex items-center gap-3 sm:gap-4 text-xs sm:text-sm text-muted-foreground p-4 sm:p-6 border-b border-border flex-shrink-0">
          <div className="flex items-center gap-1">
            <CalendarIcon className="w-3 h-3 sm:w-4 sm:h-4" />
            <span>{post.date}</span>
          </div>
          <div className="flex items-center gap-1">
            <ClockIcon className="w-3 h-3 sm:w-4 sm:h-4" />
            <span>{post.readTime}</span>
          </div>
        </div><div className="flex-1 min-h-0 overflow-y-auto scrollbar-hide">
          <div className="p-4 sm:p-6 space-y-4 sm:space-y-6 pb-6 sm:pb-8">            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-card-foreground leading-tight">
              {post.title}
            </h1>
              {/* Blog post image in modal */}
            {post.imageUrl && (
              <div className="relative w-full rounded-lg overflow-hidden">
                <img 
                  src={post.imageUrl} 
                  alt={post.imageAlt || post.title}
                  className="w-full h-auto object-contain"
                />
              </div>
            )}
              <div 
              className="prose prose-sm sm:prose-base prose-neutral dark:prose-invert max-w-none leading-relaxed"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export function Blogs() {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const postsRef = useRef<HTMLDivElement>(null);
  const [showPosts, setShowPosts] = useState(false);

  useEffect(() => {
    const node = postsRef.current;
    if (!node) return;
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShowPosts(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const openModal = (post: BlogPost) => {
    setSelectedPost(post);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPost(null);
  };
  return (    <div className="w-full h-full flex flex-col items-center px-4 sm:px-6">
      <div className="flex flex-col gap-6 max-w-4xl w-full">
        <div className="flex flex-col gap-4 p-4 sm:p-6 border border-border/50 rounded-lg bg-transparent">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-card-foreground">Blogs</h1>
          <p className="text-base leading-relaxed text-card-foreground">
            Just where I want to share my thoughts.
          </p>
        </div>
        {/* Blog Posts */}        <div ref={postsRef} className={`space-y-4 sm:space-y-6 transition-opacity duration-700 ease-out ${showPosts ? 'opacity-100 animate-fade-in-up' : 'opacity-0 translate-y-8 pointer-events-none'}`}>
          {blogPosts.map((post) => (            <article 
              key={post.id}
              className="group relative border border-border/50 rounded-lg bg-transparent hover:bg-transparent/80 hover:border-border hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden transform hover:scale-[1.02] hover:shadow-xl"
              onClick={() => openModal(post)}
            >
              {/* Blog post image */}
              {post.imageUrl && (
                <div className="relative h-40 sm:h-48 w-full overflow-hidden">
                  <img 
                    src={post.imageUrl} 
                    alt={post.imageAlt || post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              )}
                <div className="p-4 sm:p-6">
                <div className="flex flex-col gap-3 sm:gap-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 sm:gap-4 text-xs sm:text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <CalendarIcon className="w-3 h-3 sm:w-4 sm:h-4" />
                        <span>{post.date}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <ClockIcon className="w-3 h-3 sm:w-4 sm:h-4" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-xs sm:text-sm text-primary font-medium">
                      Click to read more →
                    </div>
                  </div>
                  
                  <h2 className="text-lg sm:text-xl font-semibold tracking-tight text-card-foreground group-hover:text-primary transition-colors">
                    {post.title}
                  </h2>
                  
                  <p className="text-sm sm:text-base leading-relaxed text-muted-foreground">
                    {post.excerpt}
                  </p>
                </div>
              </div>
              
              {/* Hover overlay indicator */}
              <div className="absolute inset-0 rounded-lg border-2 border-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </article>
          ))}
        </div>
      </div>

      <BlogModal 
        post={selectedPost}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </div>
  );
}
