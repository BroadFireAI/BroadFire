import { useState } from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Trophy } from 'lucide-react';

interface PyramidTier {
  place: string;
  prize: string;
  credits: string;
  width: string;
  color: string;
  hoverColor: string;
}

const tiers: PyramidTier[] = [
  {
    place: '1st Place',
    prize: '$50,000',
    credits: '$50,000 in API credits',
    width: '50%',
    color: 'bg-japandi-royal',
    hoverColor: 'hover:bg-japandi-royal-light',
  },
  {
    place: '2nd Place',
    prize: '$15,000',
    credits: '$15,000 in API credits',
    width: '75%',
    color: 'bg-japandi-earth',
    hoverColor: 'hover:bg-japandi-earth-dark',
  },
  {
    place: '3rd Place',
    prize: '$5,000',
    credits: '$5,000 in API credits',
    width: '100%',
    color: 'bg-japandi-sage',
    hoverColor: 'hover:bg-japandi-sage-light',
  },
];

export function PrizePyramid() {
  const [activeTier, setActiveTier] = useState<number | null>(null);

  return (
    <div className="flex h-full flex-col rounded-lg border border-japandi-sand bg-japandi-paper p-6 shadow-sm">
      {/* Header */}
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-japandi-royal/10">
          <Trophy className="h-5 w-5 text-japandi-royal" />
        </div>
        <div>
          <h3 className="font-semibold text-japandi-charcoal">Prize Structure</h3>
          <p className="text-xs text-japandi-mist">Odyssey Hackathon</p>
        </div>
      </div>

      {/* Pyramid visualization */}
      <TooltipProvider delayDuration={100}>
        <div className="flex flex-1 flex-col items-center justify-center gap-2 py-4">
          {tiers.map((tier, index) => (
            <Tooltip key={index}>
              <TooltipTrigger asChild>
                <div
                  className="flex w-full items-center justify-center"
                  style={{ maxWidth: tier.width }}
                  onMouseEnter={() => setActiveTier(index)}
                  onMouseLeave={() => setActiveTier(null)}
                >
                  <div
                    className={`
                      relative flex w-full cursor-pointer flex-col items-center justify-center
                      rounded py-5 text-japandi-warm-white transition-all duration-300
                      ${tier.color} ${tier.hoverColor}
                      ${activeTier === index ? 'scale-[1.03] shadow-lg' : 'shadow-md'}
                    `}
                  >
                    {/* Place label */}
                    <span className="mb-1 font-mono text-[10px] uppercase tracking-wider opacity-90">
                      {tier.place}
                    </span>

                    {/* Prize amount */}
                    <span className="font-serif text-2xl font-bold leading-none md:text-3xl">
                      {tier.prize}
                    </span>

                    {/* Subtle indicator */}
                    <div className="mt-2 h-px w-8 bg-japandi-warm-white/30" />
                  </div>
                </div>
              </TooltipTrigger>
              <TooltipContent
                side="right"
                className="border-japandi-sand bg-japandi-warm-white text-japandi-charcoal shadow-lg"
              >
                <div className="flex flex-col gap-1">
                  <p className="font-semibold">{tier.place}</p>
                  <p className="text-sm text-japandi-mist">Includes {tier.credits} match</p>
                </div>
              </TooltipContent>
            </Tooltip>
          ))}
        </div>
      </TooltipProvider>

      {/* Footer note */}
      <div className="mt-4 rounded border border-japandi-sand/50 bg-japandi-linen/30 px-3 py-2 text-center">
        <p className="text-xs leading-relaxed text-japandi-mist">
          All prizes include matching API credits for the Odyssey-2 Pro platform
        </p>
      </div>
    </div>
  );
}
