import { ArrowUpRight, AudioLines } from "lucide-react";
import { Reveal } from "./Reveal";

export function Technology() {
  return (
    <section
      id="technology"
      className="sonar-section sonar-technology"
      aria-labelledby="technology-title"
    >
      <p className="sonar-eyebrow">UNDER THE SURFACE</p>
      <Reveal>
        <h2 id="technology-title">
          Music has a structure.
          <br />
          <span>SONAR makes it visible.</span>
        </h2>
      </Reveal>
      <div className="sonar-technology-axis">
        <span>RHYTHM</span>
        <i />
        <span>ENERGY</span>
        <i />
        <AudioLines size={31} strokeWidth={1} />
        <i />
        <span>HARMONY</span>
        <i />
        <span>TIMBRE</span>
      </div>
      <p>
        Beyond filenames and folders.
        <br />A shared language for the sounds that belong together.
      </p>
    </section>
  );
}

export function Beta({ href }: { href?: string }) {
  return (
    <section
      id="beta"
      className="sonar-section sonar-beta"
      aria-labelledby="beta-title"
    >
      <Reveal>
        <p className="sonar-eyebrow">
          <span className="sonar-status" /> THE NEXT CHAPTER OF YOUR LIBRARY
        </p>
        <h2 id="beta-title">
          Hear the potential.
          <br />
          See the connections.
        </h2>
        <p>Help shape the next generation of SONAR.</p>
        {href ? (
          <a href={href} className="sonar-button">
            Join the Beta <ArrowUpRight size={16} />
          </a>
        ) : (
          <div className="sonar-beta-pending">
            <span>Beta invitations coming soon</span>
            <small>The invitation link will be available here.</small>
          </div>
        )}
        <span className="sonar-beta-platform">
          DESKTOP SOFTWARE / BUILT FOR MUSIC
        </span>
      </Reveal>
    </section>
  );
}
