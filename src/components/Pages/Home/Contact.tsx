const Contact = () => {
  return (
    <>
      <section id="contact" className="py-10 bg-gray-900 sm:py-16 lg:py-24">
        <div className="max-w-6xl px-4 mx-auto sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:items-stretch md:grid-cols-2 gap-x-12 lg:gap-x-20 gap-y-10">
            <div className="flex flex-col justify-between lg:py-5">
              <div>
                <h2 className="text-3xl font-bold leading-tight text-white sm:text-4xl lg:leading-tight lg:text-5xl">
                  It’s time to collaborate.
                </h2>

                <img
                  className="relative z-10 max-w-xs mx-auto -mb-16 md:hidden"
                  src="https://cdn.rareblocks.xyz/collection/celebration/images/contact/4/curve-line-mobile.svg"
                  alt=""
                />

                <img
                  className="hidden w-full translate-x-24 translate-y-8 md:block"
                  src="https://cdn.rareblocks.xyz/collection/celebration/images/contact/4/curve-line.svg"
                  alt=""
                />
              </div>

              <div className="hidden md:mt-auto md:block ">
               

                <blockquote className="mt-6 ">
                  <p className=" text-lg leading-relaxed text-white">
                    “The best way to predict the future is to invent it.”
                  </p>
                </blockquote>

              </div>
            </div>

            <div className="lg:pl-12">
              <div className="overflow-hidden bg-white rounded-md">
                <div className="p-6 sm:p-10">
                  <h3 className="text-3xl font-semibold text-black">
                    Want to say something?
                  </h3>
                  <p className="mt-4 text-base text-gray-600">
                    We are happy to answer any questions you have. Just send us
                    a message in the form below.
                  </p>

                  <form action="#" method="POST" className="mt-4">
                    <div className="space-y-6">
                      <div>
                        <label
                          htmlFor=""
                          className="text-base font-medium text-gray-900"
                        >
                          {" "}
                          Your name{" "}
                        </label>
                        <div className="mt-2.5 relative">
                          <input
                            type="text"
                            name=""
                            id=""
                            placeholder="Enter your full name"
                            className="block w-full px-4 py-4 text-black placeholder-gray-500 transition-all duration-200 bg-white border border-gray-200 rounded-md focus:outline-none focus:ring-orange-500 focus:border-orange-500 caret-orange-500"
                          />
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor=""
                          className="text-base font-medium text-gray-900"
                        >
                          {" "}
                          Email address{" "}
                        </label>
                        <div className="mt-2.5 relative">
                          <input
                            type="text"
                            name=""
                            id=""
                            placeholder="Enter your email address"
                            className="block w-full px-4 py-4 text-black placeholder-gray-500 transition-all duration-200 bg-white border border-gray-200 rounded-md focus:outline-none focus:ring-orange-500 focus:border-orange-500 caret-orange-500"
                          />
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor=""
                          className="text-base font-medium text-gray-900"
                        >
                          {" "}
                          Message{" "}
                        </label>
                        <div className="mt-2.5 relative">
                          <textarea
                            name=""
                            id=""
                            placeholder="Enter your message.."
                            className="block w-full px-4 py-4 text-black placeholder-gray-500 transition-all duration-200 bg-white border border-gray-200 rounded-md resize-y focus:outline-none focus:ring-orange-500 focus:border-orange-500 caret-orange-500"
                            rows={4}
                          ></textarea>
                        </div>
                      </div>

                      <div>
                        <button
                          type="submit"
                          className="inline-flex items-center justify-center w-full px-4 py-4 text-base font-semibold text-white transition-all duration-200 bg-orange-500 border border-transparent rounded-md focus:outline-none hover:bg-orange-600 focus:bg-orange-600"
                        >
                         Submit
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
};
export default Contact;
