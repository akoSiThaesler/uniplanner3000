"use client";

import { useState } from "react";

type settingsOption = {
  key: number;
  title: string;
  explanation: string;
  value: boolean;
  topic: settingsTopics;
};

enum settingsTopics {
  GENERAL = "General Settings",
  PRIVACY = "Privacy Settings"
}

const settingsOptions: settingsOption[] = [
  {
    key: 1,
    title: "Dark mode",
    explanation: "Turn the whole website into a dark theme, when activated",
    value: true,
    topic: settingsTopics.GENERAL,
  },
  {
    key: 2,
    title: "Other mode",
    explanation: "Some description",
    value: false,
    topic: settingsTopics.GENERAL,
  },
  {
    key: 3,
    title: "Another general Setting",
    explanation: "Another description",
    value: true,
    topic: settingsTopics.GENERAL,
  },
  {
    key: 4,
    title: "First Privacy Setting",
    explanation: "Turn the whole website into a dark theme, when activated",
    value: true,
    topic: settingsTopics.PRIVACY,
  },
  {
    key: 5,
    title: "Second Privacy Setting",
    explanation: "Some description",
    value: true,
    topic: settingsTopics.PRIVACY,
  },
  {
    key: 6,
    title: "One more Privacy Setting",
    explanation: "Another description",
    value: false,
    topic: settingsTopics.PRIVACY,
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

  function getCheckbox(note: settingsOption) {
    return (
      <input
        type="checkbox"
        checked={note.value}
        onChange={() => toggleCheckbox(note.key)}
        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm"
      />
    );
  }

  function getSettingsLine(note: settingsOption) {
    return <div className="flex justify-between items-center pt-4">
      <div className="flex">
        <div className="py-1"></div>
        <div>
          <p className="text-l font-bold">{note.title}</p>
          <p className="text-sm">{note.explanation}</p>
        </div>
      </div>
      {getCheckbox(note)}
    </div>;
  }

  function getTopicCard(topic: settingsTopics) {
    return (
      <div
        key={topic}
        className="border-t-4 rounded px-4 py-3 shadow-md mt-2 bg-gray-100 border-gray-400 text-gray-800"
        role="alert"
      >
        <h1 className="text-xl font-bold">{topic}</h1>
        {settings.filter(so => so.topic === topic).map(s => getSettingsLine(s))}
      </div>
    );
  }
  return <div className="p-4">{uniqueTopics.map(topic => getTopicCard(topic))}</div>;
}
