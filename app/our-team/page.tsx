import TeamCard from "@/components/card/member-card";

export default async function OurTeam() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/team`);

  const json = await res.json();
  const data = json.data;

  const departments = data;

  return (
    <div className="bg-[#F2FAF6]">
      <div className="max-w-5xl px-8 mx-auto">
        <h1 className="font-black text-2xl md:text-3xl py-8">Our Team</h1>
        <p>
          Meet the people behind every journey we create. Our team is made up of
          experienced guides, travel planners, and dedicated professionals who
          work together to deliver safe, memorable, and well-crafted adventures.
          From the mountains to your screen, every detail is handled with care.
        </p>
      </div>
      {Object.entries(departments).map(([deptId, members]) => (
        <div key={deptId} className="p-8 max-w-5xl mx-auto">
          {/* Department Name */}
          <h2 className="font-black text-xl md:text-2xl mb-4">
            {/*@ts-expect-error no type mentioned*/}
            {members[0]?.department?.name}
          </h2>

          {/* Members */}
          <div className="grid gap-4">
            {/*@ts-expect-error no type mentioned*/}
            {members.map((member) => (
              <TeamCard
                key={member.id}
                name={member.name}
                designation={member.designation}
                description={member.about}
                image={member.image}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
