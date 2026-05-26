import { getSpeechStatus, synthesizeSpeech, transcribeSpeech } from "./api-client.js";

(function initLocalSpeech() {
  var status = {
    speechToText: { enabled: false, mode: "browser-api-first" },
    textToSpeech: { enabled: false, mode: "browser-speech-synthesis-first" },
  };
  var activeRecorder = null;
  var activeStream = null;
  var activeDictateButton = null;
  var activeSpeakButton = null;
  var activeAudio = null;
  var activeRecognition = null;
  var recordStart = 0;
  var timerInterval = null;
  var root = document.documentElement;

  var defaultLanguages = [
    { code: "en", label: "EN" },
    { code: "zh", label: "中文" },
    { code: "ja", label: "日本語" },
    { code: "ko", label: "한국어" },
    { code: "es", label: "ES" },
    { code: "fr", label: "FR" },
    { code: "de", label: "DE" },
  ];

  function readMessage(key, fallback) {
    var value = root.getAttribute(key);
    return value && value.trim().length > 0 ? value : fallback;
  }

  function getPreferredLang() {
    var nav = (navigator.language || "en").toLowerCase();
    if (nav.startsWith("zh")) return "zh";
    if (nav.startsWith("ja")) return "ja";
    if (nav.startsWith("ko")) return "ko";
    if (nav.startsWith("es")) return "es";
    if (nav.startsWith("fr")) return "fr";
    if (nav.startsWith("de")) return "de";
    return "en";
  }

  function setButtonState(button, active) {
    if (!button) return;
    if (active) {
      button.classList.add("dictating");
      button.setAttribute("aria-pressed", "true");
      button.setAttribute("title", button.getAttribute("data-stop-label") || "Stop");
    } else {
      button.classList.remove("dictating");
      button.setAttribute("aria-pressed", "false");
      button.removeAttribute("title");
    }
  }

  function insertAtCursor(textarea, text) {
    if (!textarea || !text) return;
    var start = textarea.selectionStart || 0;
    var end = textarea.selectionEnd || 0;
    var value = textarea.value || "";
    textarea.value = value.slice(0, start) + text + value.slice(end);
    var cursor = start + text.length;
    textarea.setSelectionRange(cursor, cursor);
    textarea.dispatchEvent(new Event("input", { bubbles: true }));
    textarea.focus();
  }

  function showSpeechToast(message) {
    var toast = document.getElementById("gw-offline-toast");
    if (toast) {
      toast.textContent = message;
    }
  }

  function stopTracks() {
    if (activeStream === null) return;
    activeStream.getTracks().forEach((track) => {
      track.stop();
    });
    activeStream = null;
  }

  function clearTimer() {
    if (timerInterval !== null) {
      clearInterval(timerInterval);
      timerInterval = null;
    }
    recordStart = 0;
  }

  function resetDictation() {
    if (activeRecognition !== null) {
      activeRecognition.stop();
      activeRecognition = null;
    }
    if (activeRecorder !== null && activeRecorder.state !== "inactive") {
      activeRecorder.stop();
      return;
    }
    clearTimer();
    setButtonState(activeDictateButton, false);
    activeRecorder = null;
    activeDictateButton = null;
    stopTracks();
  }

  function updateTimer(button) {
    if (!button || !recordStart) return;
    var seconds = Math.floor((Date.now() - recordStart) / 1000);
    var minutes = Math.floor(seconds / 60);
    var secondText = (seconds % 60).toString().padStart(2, "0");
    var label = button.getAttribute("data-recording-label") || "Rec";
    button.setAttribute("aria-label", label + " " + minutes + ":" + secondText);
  }

  function uploadRecording(blob, targetId, language) {
    var data = new FormData();
    data.set("audio", blob, "dictation.webm");
    if (language) data.set("language", language);
    transcribeSpeech(data).then((payload) => {
      var target = document.getElementById(targetId);
      if (target && payload.text) {
        insertAtCursor(target, payload.text + " ");
        return;
      }
      if (!payload.text) {
        showSpeechToast(
          readMessage(
            "data-gw-speech-transcribe-unavailable",
            "Speech capture worked, but transcription is unavailable right now.",
          ),
        );
      }
    });
  }

  function browserRecognitionAvailable() {
    return Boolean(window.SpeechRecognition || window.webkitSpeechRecognition);
  }

  function beginBrowserRecognition(button, targetId, language) {
    var Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!Recognition) {
      showSpeechToast(
        readMessage("data-gw-speech-unavailable", "Speech input is unavailable in this browser."),
      );
      return;
    }
    var recognition = new Recognition();
    recognition.lang = language || getPreferredLang();
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    activeRecognition = recognition;
    activeDictateButton = button;
    recordStart = Date.now();
    recognition.onresult = (event) => {
      var transcript =
        event.results[0] && event.results[0][0] ? event.results[0][0].transcript : "";
      var target = document.getElementById(targetId);
      if (target && transcript) {
        insertAtCursor(target, transcript + " ");
      }
    };
    recognition.onend = () => {
      clearTimer();
      setButtonState(button, false);
      activeRecognition = null;
      activeDictateButton = null;
    };
    recognition.onerror = () => {
      showSpeechToast(
        readMessage("data-gw-speech-unavailable", "Speech input is unavailable in this browser."),
      );
      resetDictation();
    };
    setButtonState(button, true);
    recognition.start();
    timerInterval = setInterval(() => {
      updateTimer(button);
    }, 250);
  }

  function beginDictation(button) {
    var targetId = button.getAttribute("data-dictate-target");
    if (!targetId) return;
    var languageSelect = document.querySelector("[data-dictation-language]");
    var language =
      languageSelect instanceof HTMLSelectElement ? languageSelect.value : getPreferredLang();
    var mediaReady = Boolean(navigator.mediaDevices && window.MediaRecorder);
    if (mediaReady) {
      navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
        var chunks = [];
        activeStream = stream;
        activeRecorder = new MediaRecorder(stream, { mimeType: "audio/webm" });
        activeDictateButton = button;
        recordStart = Date.now();
        activeRecorder.ondataavailable = (event) => {
          if (event.data && event.data.size > 0) chunks.push(event.data);
        };
        activeRecorder.onstop = () => {
          clearTimer();
          uploadRecording(new Blob(chunks, { type: "audio/webm" }), targetId, language);
          setButtonState(button, false);
          activeRecorder = null;
          activeDictateButton = null;
          stopTracks();
        };
        setButtonState(button, true);
        activeRecorder.start(250);
        timerInterval = setInterval(() => {
          updateTimer(button);
          if (Date.now() - recordStart > 45000) {
            resetDictation();
          }
        }, 250);
      });
      return;
    }
    beginBrowserRecognition(button, targetId, language);
  }

  function stopSpeaking() {
    if (activeAudio !== null) {
      activeAudio.pause();
      activeAudio = null;
    }
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    setButtonState(activeSpeakButton, false);
    activeSpeakButton = null;
  }

  function speakWithBrowser(button, text) {
    if (!window.speechSynthesis) {
      showSpeechToast(
        readMessage("data-gw-speech-unavailable", "Read aloud is unavailable in this browser."),
      );
      return;
    }
    stopSpeaking();
    activeSpeakButton = button;
    var utterance = new SpeechSynthesisUtterance(text);
    utterance.onend = stopSpeaking;
    utterance.onerror = stopSpeaking;
    setButtonState(button, true);
    window.speechSynthesis.speak(utterance);
  }

  function speakWithServer(button, text) {
    synthesizeSpeech(text).then((response) => {
      if (!response.ok) {
        speakWithBrowser(button, text);
        return;
      }
      response.blob().then((blob) => {
        stopSpeaking();
        activeSpeakButton = button;
        activeAudio = new Audio(URL.createObjectURL(blob));
        activeAudio.onended = stopSpeaking;
        activeAudio.onerror = () => {
          speakWithBrowser(button, text);
        };
        setButtonState(button, true);
        activeAudio.play();
      });
    });
  }

  function speakText(button) {
    var targetId = button.getAttribute("data-speak-target");
    var target = targetId ? document.getElementById(targetId) : null;
    var text = target ? target.value || target.textContent || "" : "";
    if (!text.trim()) return;
    if (status.textToSpeech.mode === "browser-speech-synthesis-first") {
      speakWithBrowser(button, text);
      return;
    }
    if (status.textToSpeech.enabled) {
      speakWithServer(button, text);
      return;
    }
    speakWithBrowser(button, text);
  }

  function decorateWithLanguagePicker() {
    document.querySelectorAll("button[data-dictate-target]").forEach((button) => {
      if (button.parentElement === null) return;
      if (button.parentElement.querySelector("[data-dictation-language]") !== null) return;
      var select = document.createElement("select");
      select.className = "gw-lang";
      select.setAttribute("aria-label", "Dictation language");
      select.setAttribute("data-dictation-language", "true");
      defaultLanguages.forEach((language) => {
        var option = document.createElement("option");
        option.value = language.code;
        option.textContent = language.label;
        select.appendChild(option);
      });
      select.value = getPreferredLang();
      button.parentElement.insertBefore(select, button.nextSibling);
    });
  }

  document.addEventListener("click", (event) => {
    var target = event.target;
    if (!(target instanceof HTMLElement)) return;
    var dictate = target.closest("button[data-dictate-target]");
    if (dictate !== null) {
      event.preventDefault();
      if (activeDictateButton === dictate) resetDictation();
      else if (activeDictateButton === null) beginDictation(dictate);
      return;
    }
    var speak = target.closest("button[data-speak-target]");
    if (speak !== null) {
      event.preventDefault();
      if (activeSpeakButton === speak) stopSpeaking();
      else speakText(speak);
    }
  });

  decorateWithLanguagePicker();
  getSpeechStatus(status).then((payload) => {
    status = payload || status;
  });
  document.body.addEventListener("htmx:afterSwap", decorateWithLanguagePicker);
})();
