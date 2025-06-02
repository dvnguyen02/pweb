export function Contact() {
    return (
        <div className="w-full min-w-0">
            <div className="flex items-center justify-between mb-4 gap-2">
                <h3 className="text-lg sm:text-xl font-bold min-w-0 truncate">Contact me</h3>
            </div>
            <div className="text">
                <p className="text-base sm:text-lg mb-2">
                    If you ever need to reach out, please do so. I love getting your emails!
                </p>                <p className="text-sm sm:text-base">
                    My email is{' '}
                    <a 
                        href="mailto:duynguyen290502@gmail.com" 
                        className="underline underline-offset-4 hover:text-primary transition-colors"
                    >
                        duynguyen290502@gmail.com
                    </a>
                </p>
            </div>
        </div>
    );
}
