export default function About() {
    return (
        <section className="min-h-screen flex items-center overflow-hidden pt-10 pb-12 lg:pt-16 lg:pb-[60px] bg-white dark:bg-gray-900">
            <div className="container mx-auto">
                <div className="flex flex-wrap items-center justify-between -mx-4">
                    {/* Text Content - Now on the left */}
                    <div className="w-full px-4 lg:w-5/12 order-2 lg:order-1">
                        <div className="mt-10 lg:mt-0">
                            <span className="block mb-4 text-xl font-semibold text-blue-600 dark:text-blue-400">
                                Why Choose Us
                            </span>
                            <h2 className="mb-6 text-4xl font-bold text-gray-900 dark:text-white sm:text-5xl">
                                About us
                            </h2>
                            <div className="space-y-6">
                                <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                                    Welcome to our store! We are here to offer you the most convenient, safe, and fast online shopping experience.
                                </p>
                                
                                <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                                    In our store, you'll find a wide range of high-quality products, carefully selected to meet the diverse needs of each and every one of you. We believe in providing personalized and attentive customer service, along with competitive prices and uncompromising quality.
                                </p>

                                <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                                    Our team of experts handpicks only the best products and ensures a simple and enjoyable shopping experience. Our goal is to make online shopping accessible and enjoyable for everyone.
                                </p>

                                <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                                    Thank you for joining us on this journey – we're here for you with any questions or requests!
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Images - Now on the right */}
                    <div className="w-full px-4 lg:w-6/12 order-1 lg:order-2">
                        <div className="flex items-center -mx-3 sm:-mx-4">
                            <div className="w-full px-3 sm:px-4 xl:w-1/2">
                                <div className="py-3 sm:py-4">
                                    <img
                                        src="https://res.cloudinary.com/dlty6qxt2/image/upload/v1730843203/ecommerce_wqfukl.png"
                                        alt="Shopping Experience"
                                        className="w-full rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
                                    />
                                </div>
                                <div className="py-3 sm:py-4">
                                    <img
                                        src="https://res.cloudinary.com/dlty6qxt2/image/upload/v1730846935/image_iqrifm.png"
                                        alt="Product Display"
                                        className="w-full rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
                                    />
                                </div>
                            </div>
                            <div className="w-full px-3 sm:px-4 xl:w-1/2">
                                <div className="relative z-10 my-4">
                                    <img
                                        src="https://res.cloudinary.com/dlty6qxt2/image/upload/v1730846937/image_1_oshtpz.png"
                                        alt="Customer Service"
                                        className="w-full rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}