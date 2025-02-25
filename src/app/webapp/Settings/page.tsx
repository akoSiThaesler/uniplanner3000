"use client";

import { useState } from "react";

type SettingsOption = {
  key: number;
  title: string;
  explanation: string;
  value: boolean;
  topic: SettingsTopics;
};

enum SettingsTopics {
  GENERAL = "General Settings",
  PRIVACY = "Privacy Settings",
}

const settingsOptions: SettingsOption[] = [
  {
    key: 1,
    title: "Dark mode",
    explanation: "Turn the whole website into a dark theme when activated",
    value: true,
    topic: SettingsTopics.GENERAL,
  },
  {
    key: 2,
    title: "Other mode",
    explanation: "Some description",
    value: false,
    topic: SettingsTopics.GENERAL,
  },
  {
    key: 3,
    title: "Another general setting",
    explanation: "Another description",
    value: true,
    topic: SettingsTopics.GENERAL,
  },
  {
    key: 4,
    title: "First privacy setting",
    explanation: "Turn the website into a dark theme when activated",
    value: true,
    topic: SettingsTopics.PRIVACY,
  },
  {
    key: 5,
    title: "Second privacy setting",
    explanation: "Some description",
    value: true,
    topic: SettingsTopics.PRIVACY,
  },
  {
    key: 6,
    title: "One more privacy setting",
    explanation: "Another description",
    value: false,
    topic: SettingsTopics.PRIVACY,
  },
];

const uniqueTopics = [
  ...new Set(settingsOptions.map((option) => option.topic)),
];

export default function Settings() {
  const [settings, setSettings] = useState(settingsOptions);

  function toggleCheckbox(key: number) {
    setSettings((prevSettings) =>
      prevSettings.map((option) =>
        option.key === key ? { ...option, value: !option.value } : option
      )
    );
  }

  function getCheckbox(option: SettingsOption) {
    return (
      <input
        type="checkbox"
        checked={option.value}
        onChange={() => toggleCheckbox(option.key)}
        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm"
      />
    );
  }

  function getSettingsLine(option: SettingsOption) {
    return (
      <div className="flex justify-between items-center pt-4">
        <div className="flex">
          <div className="py-1"></div>
          <div>
            <p className="text-base font-bold">{option.title}</p>
            <p className="text-sm">{option.explanation}</p>
          </div>
        </div>
        {getCheckbox(option)}
      </div>
    );
  }

  function getTopicCard(topic: SettingsTopics) {
    return (
      <div
        key={topic}
        className="border-t-4 rounded px-4 py-3 shadow-md mt-2 bg-gray-100 border-gray-400 text-gray-800"
        role="alert"
      >
        <h1 className="text-xl font-bold">{topic}</h1>
        {settings
          .filter((option) => option.topic === topic)
          .map((option) => (
            <div key={option.key}>{getSettingsLine(option)}</div>
          ))}
      </div>
    );
  }

  return (
    <div className="p-4">
      {uniqueTopics.map((topic) => getTopicCard(topic as SettingsTopics))}
    </div>
  );
}
