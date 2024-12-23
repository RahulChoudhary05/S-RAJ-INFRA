import React, { useState } from "react";
import styles from "./TeamMemberReveal.module.css";

const teamMembers = [
  {
    id: 1,
    title: "Sathyendra Singh",
    name: "Managing Director",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSG7pyhyHsQya4178TCw8BgkFoG31Bo8RLmHQ&s",
    post: "Leading the company to new heights",
    link: "https://github.com/Singhmayank0217",
  },
  {
    id: 2,
    title: "Kumar Deepak",
    name: "Director",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEu6ZsR0VBPv4ei51SbzDQmsdkq_vxQgwiUw&s",
    post: "Driving innovation in technology",
    link: "https://github.com/RahulChoudhary05",
  },
  {
    id: 3,
    title: "Sourav Singh",
    name: "Chief Technology Officer",
    image:
      "https://media.istockphoto.com/id/149452771/photo/man-with-gray-hair-and-beard-wearing-shirt-and-blue-suit.jpg?s=612x612&w=0&k=20&c=XZiyF-Y2DNnYcCA-KFWoDPnBOzr-OAcp4SUdom956Vo=",
    post: "Driving innovation in technology",
    link: "/team/mike-johnson",
  },
  {
    id: 4,
    title: "Uma Nand Singh",
    name: "Managing Director",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSG7pyhyHsQya4178TCw8BgkFoG31Bo8RLmHQ&s",
    post: "Optimizing business operations",
    link: "/team/sarah-williams",
  },
];

const TeamMemberCard = ({ member, isFlipped, onFlip, onLeave }) => {
  return (
    <div
      className={`${styles.card} ${isFlipped ? styles.flipped : ""}`}
      onMouseEnter={onFlip}
      onMouseLeave={onLeave}
      onClick={() => (window.location.href = member.link)}
    >
      <div className={`${styles.cardInner} pt-3 pl-2 bg-[#d6d3d1] shadow-lg rounded-lg`}>
      <div className={`${styles.cardFront} flex items-center justify-center bg-[#e7e5e4] text-richblack-900`}>
          <div className={styles.imageWrapper}>
            <img src={member.image} alt={member.name} />
          </div>
          <h2 className={`${styles.name} text-xl font-semibold font-playfair`}>{member.name}</h2>
          <p className={`${styles.title} text-lg font-playfair italic font-medium`}>{member.title}</p>
        </div>
        <div className={styles.cardBack}>
          <p className={`${styles.post}font-playfair italic font-medium text-white text-xl `}>{member.post}</p>
        </div>
      </div>
    </div>
  );
};

const TeamMemberReveal = () => {
  const [flippedMember, setFlippedMember] = useState(null);

  return (
    <div className="w-full bg-gradient-to-b from-[#f3f1f1] to-[#d6d3d1] py-8 text-center">
      <h2 className="text-7xl font-extrabold font-playfair text-richblack-900 mb-5">
        Board of Directors
      </h2>
      <div className={styles.container}>
        <div className={styles.mainRow}>
          <TeamMemberCard
            member={teamMembers[0]}
            isFlipped={flippedMember === teamMembers[0].id}
            onFlip={() => setFlippedMember(teamMembers[0].id)}
            onLeave={() => setFlippedMember(null)}
          />
        </div>
        <div className={styles.subRow}>
          {teamMembers.slice(1).map((member) => (
            <TeamMemberCard
              key={member.id}
              member={member}
              isFlipped={flippedMember === member.id}
              onFlip={() => setFlippedMember(member.id)}
              onLeave={() => setFlippedMember(null)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeamMemberReveal;
