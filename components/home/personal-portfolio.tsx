"use client";

import { type CSSProperties, type PointerEvent, useEffect, useMemo, useRef, useState } from "react";

import { centerEntry, deskArtifacts, identity, interestNodes, socials } from "@/content/portfolio";

type NodeId = (typeof interestNodes)[number]["id"];
type Point = { x: number; y: number };
type NodeState = Record<NodeId, Point>;
type ActiveEntry = {
  id: NodeId | "center";
  title: string;
  body: string;
  color: string;
  entries?: readonly {
    title: string;
    date?: string;
    body: string;
    tags?: readonly string[];
  }[];
};

const nodeRadiusFactors = [1, 0.92, 1.07, 0.95, 1.03, 0.96, 1.05, 0.93, 1.02, 0.97];
const nodeRotations = [-4, 3, -5, 2, -3, 4, -2, 5, -4, 3];

export function PersonalPortfolio() {
  const deskRef = useRef<HTMLDivElement>(null);
  const [center, setCenter] = useState<Point>({ x: 0, y: 0 });
  const [homePositions, setHomePositions] = useState<NodeState>(() => createInitialPositions());
  const [positions, setPositions] = useState<NodeState>(() => createInitialPositions());
  const [activeEntry, setActiveEntry] = useState<ActiveEntry | null>(null);
  const [draggingId, setDraggingId] = useState<NodeId | null>(null);

  const edges = useMemo(
    () =>
      interestNodes.map((node, index) => ({
        id: node.id,
        color: node.color,
        path: makeEdgePath(center, positions[node.id], index)
      })),
    [center, positions]
  );

  useEffect(() => {
    function updateLayout() {
      const desk = deskRef.current;

      if (!desk) {
        return;
      }

      const rect = desk.getBoundingClientRect();
      const nextCenter = { x: rect.width / 2, y: rect.height / 2 };
      const radius = Math.min(rect.width, rect.height) * 0.41;
      const nextHomePositions = Object.fromEntries(
        interestNodes.map((node, index) => {
          const angle = -Math.PI / 2 + index * ((Math.PI * 2) / interestNodes.length) + (index % 2 ? 0.08 : -0.05);
          return [
            node.id,
            {
              x: nextCenter.x + Math.cos(angle) * radius * nodeRadiusFactors[index % nodeRadiusFactors.length],
              y: nextCenter.y + Math.sin(angle) * radius * nodeRadiusFactors[index % nodeRadiusFactors.length]
            }
          ];
        })
      ) as NodeState;

      setCenter(nextCenter);
      setHomePositions(nextHomePositions);
      setPositions((currentPositions) => {
        const hasMeasured = Object.values(currentPositions).some((point) => point.x || point.y);
        return hasMeasured ? currentPositions : nextHomePositions;
      });
    }

    updateLayout();
    window.addEventListener("resize", updateLayout);

    return () => window.removeEventListener("resize", updateLayout);
  }, []);

  useEffect(() => {
    if (draggingId) {
      return;
    }

    const interval = window.setInterval(() => {
      setPositions((currentPositions) => {
        const nextPositions = { ...currentPositions };

        interestNodes.forEach((node) => {
          const current = currentPositions[node.id];
          const home = homePositions[node.id];

          nextPositions[node.id] = {
            x: current.x + (home.x - current.x) * 0.025,
            y: current.y + (home.y - current.y) * 0.025
          };
        });

        return nextPositions;
      });
    }, 32);

    return () => window.clearInterval(interval);
  }, [draggingId, homePositions]);

  function activateNode(node: (typeof interestNodes)[number]) {
    setActiveEntry({
      id: node.id,
      title: node.label,
      body: node.body,
      color: node.color,
      entries: "entries" in node ? node.entries : undefined
    });
  }

  function openCenterEntry() {
    setActiveEntry({
      id: "center",
      title: centerEntry.title,
      body: centerEntry.body,
      color: "#a9783c"
    });
  }

  function moveNode(id: NodeId, event: PointerEvent<HTMLButtonElement>) {
    const desk = deskRef.current;

    if (!desk) {
      return;
    }

    const rect = desk.getBoundingClientRect();
    setPositions((currentPositions) => ({
      ...currentPositions,
      [id]: {
        x: clamp(event.clientX - rect.left, 58, rect.width - 58),
        y: clamp(event.clientY - rect.top, 52, rect.height - 52)
      }
    }));
  }

  return (
    <main className="portfolio-stage">
      <header className="portfolio-topbar">
        <span>
          <strong>{identity.name}</strong> — {identity.tagline}
        </span>
        <span className="portfolio-hint">hover · click · drag</span>
      </header>

      <section ref={deskRef} className="diary-desk" aria-label="Diary desk mosaic">
        <p className="desk-thesis">{identity.thesis}</p>

        <svg className="desk-edges" aria-hidden="true">
          {edges.map((edge) => (
            <path
              key={edge.id}
              className={activeEntry?.id === edge.id ? "is-active" : undefined}
              d={edge.path}
              style={{ "--active-color": edge.color } as CSSProperties}
            />
          ))}
        </svg>

        <button
          className="center-diary-card"
          type="button"
          onClick={openCenterEntry}
          style={{
            transform: `translate(${center.x - 140}px, ${center.y - 140}px) rotate(-1.5deg)`
          }}
        >
          <span className="diary-eyebrow">{centerEntry.eyebrow}</span>
          <span className="center-name">
            Bhakti
            <br />
            Chokshi
          </span>
          <span className="center-note">{identity.centerNote}</span>
        </button>

        {deskArtifacts.map((artifact) => (
          <aside key={artifact.id} className={`desk-artifact desk-artifact--${artifact.variant}`}>
            <strong>{artifact.title}</strong>
            {artifact.body}
          </aside>
        ))}

        <aside
          className="desk-entry-card"
          style={{ "--panel-color": activeEntry?.color ?? "#a9783c" } as CSSProperties}
          aria-live="polite"
        >
          <p className="panel-kicker">diary entry</p>
          <h2>{activeEntry?.title ?? "hover, click, or drag a note"}</h2>
          <p className="panel-body">
            {activeEntry?.body ??
              "The page stays still now. The desk note changes in place instead of opening a side panel."}
          </p>
          {activeEntry?.entries?.length ? (
            <div className="panel-entries">
              {activeEntry.entries.map((entry) => (
                <article key={`${entry.title}-${entry.date ?? "undated"}`} className="panel-entry">
                  {entry.date ? <time>{entry.date}</time> : null}
                  <h3>{entry.title}</h3>
                  <p>{entry.body}</p>
                  {entry.tags?.length ? (
                    <ul>
                      {entry.tags.map((tag) => (
                        <li key={tag}>{tag}</li>
                      ))}
                    </ul>
                  ) : null}
                </article>
              ))}
            </div>
          ) : null}
        </aside>

        {interestNodes.map((node, index) => {
          const position = positions[node.id];
          const isActive = activeEntry?.id === node.id;

          return (
            <button
              key={node.id}
              type="button"
              className={`postit-node ${isActive ? "is-active" : ""}`}
              onMouseEnter={() => activateNode(node)}
              onClick={() => activateNode(node)}
              onPointerDown={(event) => {
                event.currentTarget.setPointerCapture(event.pointerId);
                setDraggingId(node.id);
                activateNode(node);
                moveNode(node.id, event);
              }}
              onPointerMove={(event) => {
                if (draggingId === node.id) {
                  moveNode(node.id, event);
                }
              }}
              onPointerUp={(event) => {
                if (event.currentTarget.hasPointerCapture(event.pointerId)) {
                  event.currentTarget.releasePointerCapture(event.pointerId);
                }
                setDraggingId(null);
              }}
              style={
                {
                  "--node-color": node.color,
                  transform: `translate(${position.x - 59}px, ${position.y - 46}px) rotate(${nodeRotations[index % nodeRotations.length]}deg)`
                } as CSSProperties
              }
            >
              <span>{node.label}</span>
              <span className="postit-link-mark" aria-hidden="true">
                ↗
              </span>
            </button>
          );
        })}
      </section>

      <footer className="portfolio-footer">
        <a href={`mailto:${identity.email}`}>{identity.email}</a>
        <nav aria-label="Elsewhere">
          {socials.map((link) => (
            <a key={link.label} href={link.href} target={link.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
              {link.label}
            </a>
          ))}
        </nav>
      </footer>

    </main>
  );
}

function createInitialPositions() {
  return Object.fromEntries(interestNodes.map((node) => [node.id, { x: 0, y: 0 }])) as NodeState;
}

function makeEdgePath(center: Point, point: Point, index: number) {
  const midX = (center.x + point.x) / 2;
  const midY = (center.y + point.y) / 2;
  const curve = index % 2 === 0 ? 18 : -18;

  return `M ${center.x} ${center.y} Q ${midX + curve} ${midY - curve} ${point.x} ${point.y}`;
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}
