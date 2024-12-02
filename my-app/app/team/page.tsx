export default function Team() {
    const teamMembers = [
        { name: "Efrat Yishai", title: "Does everything to the end. It's fun to work with her ;)", imgSrc: "https://res.cloudinary.com/dlty6qxt2/image/upload/v1730840713/profileTeam_wmnbwo.png" },
        { name: "Avital Walden", title: "Excellent problem solver. Does a very smart job.", imgSrc: "https://res.cloudinary.com/dlty6qxt2/image/upload/v1730840713/profileTeam_wmnbwo.png" },
        { name: "Michal Walden", title: "Works thoroughly. An excellent designer.", imgSrc: "https://res.cloudinary.com/dlty6qxt2/image/upload/v1730840713/profileTeam_wmnbwo.png" },
        { name: "Sarah Taharani", title: "Smart and efficient. Works fast and helps everyone.", imgSrc: "https://res.cloudinary.com/dlty6qxt2/image/upload/v1730840713/profileTeam_wmnbwo.png" },
        { name: "Ester Weingarten", title: "Gives help to everyone. Takes on the complicated things.", imgSrc: "https://res.cloudinary.com/dlty6qxt2/image/upload/v1730840713/profileTeam_wmnbwo.png" },
        { name: "Ruchama Bricker", title: "Very smart. Does thorough work and is not afraid of problems.", imgSrc: "https://res.cloudinary.com/dlty6qxt2/image/upload/v1730840713/profileTeam_wmnbwo.png" },
        { name: "Hadassa Bradpiece", title: "Not afraid of challenges, does everything in the best way.", imgSrc: "https://res.cloudinary.com/dlty6qxt2/image/upload/v1730840713/profileTeam_wmnbwo.png" },
        { name: "Noa Marciano", title: "Pays attention to the small details, works well in a team.", imgSrc: "https://res.cloudinary.com/dlty6qxt2/image/upload/v1730840713/profileTeam_wmnbwo.png" },
    ];

    return (
        <div>
            <section className="py-12 bg-white dark:bg-gray-900">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mb-6">
                        <h2 className="font-manrope text-5xl text-center font-bold text-gray-900 dark:text-white">Our Team</h2>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto lg:max-w-full">
                        {teamMembers.map((member, index) => (
                            <div key={index} className="block text-center">
                                <div className="relative mb-6">
                                    <div className="w-44 h-44 rounded-full mx-auto p-1 bg-gradient-to-r from-orange-500 via-purple-500 to-blue-400 dark:from-orange-300 dark:via-purple-400 dark:to-blue-300">
                                        <img
                                            src={member.imgSrc}
                                            alt={`${member.name} image`}
                                            className="w-full h-full rounded-full object-cover border-3 border-transparent"
                                        />
                                    </div>
                                </div>
                                <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 capitalize">
                                    {member.name}
                                </h4>
                                <span className="text-gray-500 dark:text-gray-400 block">
                                    {member.title}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
