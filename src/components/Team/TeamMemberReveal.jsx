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
      <div
        className={`${styles.cardInner} pt-2 pl-2 shadow-lg rounded-lg bg-slate-200`}
      >
        <div className={`${styles.cardFront} flex items-center justify-cente`}>
          <div className={styles.imageWrapper}>
            <img src={member.image} alt={member.name} />
          </div>
          <h2
            className={`${styles.name} text-xl font-semibold font-playfair mb-[.05px]`}
          >
            {member.name}
          </h2>
          <p
            className={`${styles.title} text-lg font-playfair italic font-medium text-orange-600`}
          >
            {member.title}
          </p>
        </div>
        <div className={styles.cardBack}>
          <p
            className={`${styles.post}font-playfair italic font-medium text-xl `}
          >
            {member.post}
          </p>
        </div>
      </div>
    </div>
  );
};

const TeamMemberReveal = () => {
  const [flippedMember, setFlippedMember] = useState(null);

  return (
    <div className="w-full py-24 text-center bg-gradient-to-b from-slate-200 via-white to-slate-100">
      <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-slate-900 font-[playfair] italic mb-5">
        Board of{" "}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-orange-500">
          Directors
        </span>
      </h2>

      <div className="w-32 h-1 mx-auto mb-11 bg-gradient-to-r from-transparent via-orange-400 to-transparent" />
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
