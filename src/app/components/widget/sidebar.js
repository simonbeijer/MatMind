"use client";
export default function Sidebar({ selectedWidget, setSelectedWidget }) {
  const widgetItems = ["Weather", "Analytics", "Dashboard"];

  const setWidgetItem = (index) => {
    let newItem = widgetItems[index];
    setSelectedWidget(newItem);
  };

  return (
    <aside className="w-64 bg-onboarding-card-bg shadow-lg p-6 border-r border-onboarding-border-subtle backdrop-blur-sm">
      <h3 className="text-lg font-semibold text-onboarding-text-primary mb-6">Dashboard</h3>
      <ul className="space-y-2">
        {widgetItems.map((item, index) => (
          <li key={index}>
            <button
              onClick={() => setWidgetItem(index)}
              className={`w-full p-3 text-left rounded-lg transition-all duration-200 ${
                item === selectedWidget 
                  ? "bg-gradient-to-r from-onboarding-accent-start to-onboarding-accent-end text-onboarding-bg-primary font-medium shadow-md" 
                  : "bg-onboarding-bg-secondary text-onboarding-text-primary hover:bg-onboarding-hover-bg"
              }`}
            >
              {item}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
}
