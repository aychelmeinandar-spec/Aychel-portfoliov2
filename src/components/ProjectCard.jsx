import React from "react";
import { ArrowUpRight, Github } from "lucide-react";
import { SpotlightCard } from "./reactbits";

export function ProjectCard({ project, light = false }) {
  const targetLink = project.previewUrl || project.sourceUrl || project.link;

  const spotlightColor =
    project.accent === "violet"
      ? "rgba(167, 139, 250, 0.45)"
      : project.accent === "blue"
      ? "rgba(103, 215, 255, 0.45)"
      : "rgba(255, 193, 142, 0.45)";

  return (
    <SpotlightCard
      theme={light ? "light" : "dark"}
      spotlightColor={spotlightColor}
      intensity={0.25}
      spotlightSize={320}
      borderGlow={0.75}
      className={`project-card ${project.accent}`}
    >
      <div className="project-top">
        <span>
          {project.no} / {project.type}
        </span>
        <a
          href={targetLink}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Buka ${project.name}`}
        >
          <ArrowUpRight size={19} />
        </a>
      </div>

      <div className="project-visual">
        <div className="mock-window">
          <div className="window-bar">
            <i />
            <i />
            <i />
            <span>{project.name.toLowerCase()}.app</span>
          </div>

          <div className="mock-content">
            <div className="mock-sidebar">
              <b>A.</b>
              <i />
              <i />
              <i />
            </div>

            <div className="mock-main">
              <div className="mock-title" />
              <div className="mock-subtitle" />
              <div className="mock-blocks">
                <i />
                <i />
                <i />
              </div>
              <div className="mock-line" />
              <div className="mock-line short" />
            </div>
          </div>
        </div>
        <div className="visual-glow" />
      </div>

      <div className="project-info">
        <h3>{project.name}</h3>
        <p>{project.description}</p>

        <div className="tag-row">
          {project.tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>

        <div className="project-actions">
          {project.previewUrl ? (
            <a
              className="project-btn project-btn-primary"
              href={project.previewUrl}
              target="_blank"
              rel="noreferrer"
            >
              Live Preview <ArrowUpRight size={15} />
            </a>
          ) : (
            <span
              className="project-btn project-btn-disabled"
              aria-disabled="true"
            >
              Live Preview · Segera hadir
            </span>
          )}

          {project.sourceUrl ? (
            <a
              className="project-btn project-btn-secondary"
              href={project.sourceUrl}
              target="_blank"
              rel="noreferrer"
            >
              <Github size={15} /> Source Code
            </a>
          ) : (
            <span
              className="project-btn project-btn-disabled"
              aria-disabled="true"
            >
              Source Code · Segera hadir
            </span>
          )}
        </div>
      </div>
    </SpotlightCard>
  );
}
