import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  Check,
  FileText,
  RotateCcw,
  ShieldCheck,
  UserCheck,
  X,
} from "lucide-react";
import { ProductTour } from "./ProductMedia";

export default function WorkflowSection() {
  const [state, setState] = useState<
    "ready" | "review" | "approved" | "denied"
  >("ready");
  const decision = useRef<HTMLButtonElement>(null);
  const result = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (state === "review") decision.current?.focus();
    if (state === "approved" || state === "denied") result.current?.focus();
  }, [state]);
  const finished = state === "approved" || state === "denied";
  return (
    <section id="platform" className="ns-workflow-section ns-section">
      <div className="ns-container">
        <div className="ns-section-heading">
          <div>
            <p className="ns-eyebrow">02 / FROM REQUEST TO ACTION</p>
            <h2>
              Let the agent work.
              <br />
              <span>Keep the decisions yours.</span>
            </h2>
          </div>
          <div className="ns-heading-aside">
            <p>
              A revenue report is routine. Changing CRM records needs your
              approval. Try the decision below.
            </p>
            <ProductTour />
          </div>
        </div>
        <div className="ns-workflow-demo">
          <div className="ns-workflow-caption">
            <span>REVENUE OPERATIONS</span>
            <span>Interactive illustration · no live tools</span>
          </div>
          <ol className="ns-workflow-steps" aria-label="Example workflow">
            {["Request", "Policy check", "Your approval", "Result"].map(
              (label, index) => (
                <li
                  key={label}
                  aria-current={
                    (
                      state === "ready"
                        ? index === 0
                        : state === "review"
                          ? index === 2
                          : index === 3
                    )
                      ? "step"
                      : undefined
                  }
                  className={
                    (state !== "ready" && index < 2) ||
                    (finished && index === 2)
                      ? "is-complete"
                      : ""
                  }
                >
                  <span>
                    {(state !== "ready" && index < 2) ||
                    (finished && index === 2) ? (
                      <Check size={16} />
                    ) : (
                      `0${index + 1}`
                    )}
                  </span>
                  {label}
                </li>
              ),
            )}
          </ol>
          <div className="ns-workflow-content">
            <div className="ns-workflow-context">
              <div>
                <FileText size={21} />
                <h3>The request</h3>
                <p>
                  Prepare a revenue report and update the matching CRM contacts.
                </p>
              </div>
              <div>
                <ShieldCheck size={21} />
                <h3>The policy</h3>
                <p>
                  Reading data is allowed. The configured Tool Approval policy
                  pauses CRM writes for review.
                </p>
                <code>crm.update_contact → approval required</code>
              </div>
            </div>
            <div className="ns-workflow-decision">
              {state === "ready" ? (
                <>
                  <UserCheck size={28} />
                  <h3>What happens before a write?</h3>
                  <p>Follow an example request to its approval checkpoint.</p>
                  <button
                    className="bs-button"
                    onClick={() => setState("review")}
                  >
                    Start example <ArrowRight size={17} />
                  </button>
                </>
              ) : state === "review" ? (
                <>
                  <span className="ns-workflow-status">
                    WAITING FOR YOUR APPROVAL
                  </span>
                  <h3>Allow the CRM update?</h3>
                  <p>
                    The report is prepared. The proposed contact update is
                    paused until you decide.
                  </p>
                  <div className="ns-workflow-actions">
                    <button
                      ref={decision}
                      className="bs-button"
                      onClick={() => setState("approved")}
                    >
                      <Check size={17} /> Approve update
                    </button>
                    <button
                      className="ns-workflow-deny"
                      onClick={() => setState("denied")}
                    >
                      <X size={17} /> Deny update
                    </button>
                  </div>
                </>
              ) : (
                <div ref={result} tabIndex={-1}>
                  <span className="ns-workflow-status">
                    {state === "approved" ? "APPROVED" : "DENIED"}
                  </span>
                  <h3>
                    {state === "approved"
                      ? "The update can proceed."
                      : "The write stays blocked."}
                  </h3>
                  <p>
                    {state === "approved"
                      ? "In this example, approval allows the queued CRM update to execute."
                      : "In this example, the CRM update does not execute. The prepared report remains available."}
                  </p>
                  <button
                    className="ns-text-link"
                    onClick={() => setState("ready")}
                  >
                    <RotateCcw size={16} /> Try again
                  </button>
                </div>
              )}
            </div>
          </div>
          <p className="ns-workflow-disclosure" role="status">
            {state === "ready"
              ? "Illustrative scenario. Start the example to explore the approval decision."
              : state === "review"
                ? "Example paused: choose Approve update or Deny update."
                : state === "approved"
                  ? "Example complete: update approved. No real data was changed."
                  : "Example complete: update denied. No real data was changed."}
          </p>
        </div>
      </div>
    </section>
  );
}
