import { useEffect, useState, useRef } from "react";
import styles from "../styles/Contact.module.css";
import pipe from "../assets/img/pipe-major-about.png";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    brand: "",
    al_type: [],
    businessObjectives: [],
    comment: "",
  });
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdown((prev) => ({ ...prev, type: false, state: false }));
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const [dropdown, setDropdown] = useState({
    type: false,
    state: false,
  });

  const toggleDropdown = (field) => {
    setDropdown((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      const updatedValues = checked
        ? [...formData[name], value]
        : formData[name].filter((val) => val !== value);

      setFormData((prev) => ({ ...prev, [name]: updatedValues }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Format the businessObjectives as a comma-separated string
    const formattedBusinessObjectives = formData.businessObjectives.join(", ");

    // You can use the formatted string directly in the submission data
    const formDataToSubmit = {
      ...formData,
      businessObjectives: formattedBusinessObjectives,
    };

    // Submit to Formsubmit
    const form = e.target;
    Object.keys(formDataToSubmit).forEach((key) => {
      const input = document.createElement("input");
      input.type = "hidden";
      input.name = key;
      input.value = formDataToSubmit[key];
      form.appendChild(input);
    });
    form.submit();
  };

  return (
    <>
    <div className={styles.contact_main_container}>
      <div className={styles.contact_image}>
        <img src={pipe} alt="contact-banner" />
      </div>
      <div className={styles.form_main_container}>
        <form
          onSubmit={handleSubmit}
          action="https://formsubmit.co/alcopop@alcopop.in"
          method="POST"
          className={styles.formContainer}
        >
          {/* Hidden Inputs */}
          <input type="hidden" name="_captcha" value="false" />
          <input type="hidden" name="_template" value="table" />
          <input type="hidden" name="_subject" value="New Query!" />
          <h2 className={styles.title}>Contact Us</h2>

          <input
            type="text"
            name="name"
            placeholder="Name*"
            value={formData.name}
            onChange={handleChange}
            className={styles.inputField}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email*"
            value={formData.email}
            onChange={handleChange}
            className={styles.inputField}
            required
          />

          <input
            type="tel"
            name="contact"
            placeholder="Contact*"
            value={formData.contact}
            onChange={handleChange}
            className={styles.inputField}
            required
          />

          <input
            type="text"
            name="brand"
            placeholder="Brand*"
            value={formData.brand}
            onChange={handleChange}
            className={styles.inputField}
            required
          />

          <div ref={dropdownRef} className={styles.dropdownContainer}>
            <div
              className={styles.dropdownHeader}
              onClick={() => toggleDropdown("type")}
            >
              {formData.al_type.length > 0
                ? formData.al_type.join(", ")
                : "Select Type*"}
            </div>
            {dropdown.type && (
              <div className={styles.dropdownMenu}>
                {["Spirits", "Wine", "Beer", "Liqueurs"].map((type) => (
                  <label key={type} className={styles.checkboxLabel}>
                    <input
                      type="checkbox"
                      name="al_type"
                      value={type}
                      checked={formData.al_type.includes(type)}
                      onChange={handleChange}
                      className={styles.checkbox}
                    />
                    {type}
                  </label>
                ))}
              </div>
            )}
          </div>

          <div className={styles.checkboxContainer}>
            <label className={styles.label}>Business Objectives*</label>
            <div className={styles.checkboxGroup}>
              {[
                "Market Entry",
                "Regulatory Compliance Support",
                "Distribution Expansion",
                "Marketing & Brand Activation",
              ].map((objective) => (
                <label key={objective} className={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    name="businessObjectives"
                    value={objective}
                    checked={formData.businessObjectives.includes(objective)}
                    onChange={handleChange}
                    className={styles.checkbox}
                  />
                  {objective}
                </label>
              ))}
            </div>
          </div>

          <textarea
            name="comment"
            placeholder="Comment*"
            value={formData.comment}
            onChange={handleChange}
            className={styles.textarea}
            required
          />
          <button type="submit" className={styles.submitButton}>
            Contact Us
          </button>
        </form>
      </div>
    </div>
    
    </>
  );
};

export default ContactUs;
