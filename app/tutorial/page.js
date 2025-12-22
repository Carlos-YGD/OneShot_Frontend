"use client";

export default function TutorialPage() {
  const steps = [
    { title: "1. The Game Screen", text: "After selecting your character and preferred palette, this is what you'll see. P1 is to the left and P2 to the right.", image: "/images/tutorial01.jpeg" },
    { title: "2. Get Ready", text: "Wait for the 'SHOOT!' signal to pop up before reacting.", image: "/images/tutorial02.jpeg" },
    { title: "3. React Fast and Shoot!", text: "Press your key as soon as the signal appears! If you press it faster than your opponent, you take one of their lives!", image: "/images/tutorial04.jpeg" },
    { title: "4. Too Early", text: "If you get too desperate and press too early, you lose a life! Patience is key!", image: "/images/tutorial05.jpeg" },
    { title: "5. Too Late", text: "If nobody decides to shoot anyone in under ten seconds, both players lose a life.", image: "/images/tutorial06.jpeg" },
    { title: "6. Draw", text: "In the rare case that both you and your opponent press the input at the exact same time, a draw occurs! Nobody loses a life and the match continues.", image: "/images/tutorial06-1.jpeg" },
    { title: "7. Win the Match", text: "Last player with lives remaining wins the match!", image: "/images/tutorial07.jpeg" },
  ];

  return (
    <div className="flex justify-center mt-5">
      <div className="bg-[#f8eed5] min-w-md max-w-xl p-4 border border-[#4f4735] shadow-[2px_2px_0_#000] flex flex-col gap-8">
        <h1 className="font-bold text-center text-2xl">How to Play</h1>
        <h2 className="text-center">Welcome to OneShot! <br></br>The goal of the game is to shoot faster than your opponent and be the last man standing!<br></br> Read carefully, as the wisdom you will receive here may guide you to victory.</h2>
        <h2 className="text-center">Here is some important info! The controls! They are very simple, but here they are listed below!</h2>
        <ul>
            <li className="text-gray-700"><span className="font-bold">Shooting:</span> P1 - W key : P2 - up key</li>
            <li className="text-gray-700"><span className="font-bold">Select Character:</span> P1 - W key/S key : P2 - up key/down key</li>
            <li className="text-gray-700"><span className="font-bold">Select Palette:</span> P1 - A key/D key : P2 - left key/right key</li>
        </ul>
        

        {steps.map((step, index) => (
          <section key={index} className="flex flex-col gap-2">
            <h2 className="font-bold text-lg">{step.title}</h2>
            <p className="text-gray-700">{step.text}</p>
            <div className="overflow-hidden border border-[#4f4735] shadow-[1px_1px_0_#000]">
              <img src={step.image} alt={step.title} className="w-full object-contain" />
            </div>
          </section>
        ))}

        <div className="flex justify-center mt-4">
        </div>
      </div>
    </div>
  );
}
