import "./Statement.css";

export function Statement() {
  return (
    <section className="amaloo-approach-section" id="approach">
      <div className="amaloo-approach-grid">

        <div className="amaloo-approach-content">
          <span className="amaloo-approach-label">
            OUR APPROACH
          </span>

          <h2>
            Engineering solutions built with
            <span> precision, innovation </span>
            and reliability.
          </h2>

          <p>
            At <strong>AMALO Engineering Group Limited</strong>, we believe
            every successful project begins with careful planning and ends with
            uncompromising quality. Our multidisciplinary team delivers
            electrical, mechanical, ICT and engineering solutions that are
            efficient, sustainable and tailored to every client's needs.
          </p>

          <div className="amaloo-approach-highlights">

            <div className="amaloo-approach-card">
              <h3>Quality First</h3>
              <p>
                Every project is delivered according to the highest engineering
                standards.
              </p>
            </div>

            <div className="amaloo-approach-card">
              <h3>Innovation</h3>
              <p>
                We embrace modern technologies that improve efficiency and
                long-term value.
              </p>
            </div>

            <div className="amaloo-approach-card">
              <h3>Trusted Delivery</h3>
              <p>
                Reliable execution with transparency from planning to project
                completion.
              </p>
            </div>

          </div>
        </div>

        <div className="amaloo-approach-image">

          <img
            src="/images/engineering-team.jpg"
            alt="AMALO Engineering Team"
          />

          <div className="amaloo-approach-badge">
            <h3>Professional Engineering</h3>
            <p>Delivering excellence across Uganda.</p>
          </div>

        </div>

      </div>
    </section>
  );
}