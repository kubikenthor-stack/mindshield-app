import React, { useState } from 'react';
import { FLUTTER_PROJECT_FILES } from '../data/flutterFiles';
import { FlutterCodeFile } from '../types';
import { Folder, FileCode, Copy, Check, Download, Terminal, Layers, FileText } from 'lucide-react';

export const FlutterCodeViewer: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<FlutterCodeFile>(FLUTTER_PROJECT_FILES[1]); // main.dart
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(selectedFile.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadFile = () => {
    const blob = new Blob([selectedFile.code], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = selectedFile.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden flex flex-col h-[720px]">
      {/* Top Header */}
      <div className="p-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-blue-600/30 border border-blue-400/30 flex items-center justify-center text-blue-400">
            <Terminal size={18} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-white tracking-tight">
                Cấu Trúc Thư Mục &amp; Mã Nguồn Flutter
              </h3>
              <span className="text-[10px] font-mono bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded-full border border-blue-400/20">
                app_tam_ly_khkt
              </span>
            </div>
            <p className="text-[11px] text-slate-400">
              Dự án Flutter hoàn chỉnh phục vụ nghiên cứu &amp; nộp hồ sơ KHKT
            </p>
          </div>
        </div>

        {/* Copy / Download buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
          >
            {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
            <span>{copied ? 'Đã sao chép!' : 'Sao chép file'}</span>
          </button>
          <button
            onClick={handleDownloadFile}
            className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white transition-colors"
          >
            <Download size={14} />
            <span>Tải file .dart</span>
          </button>
        </div>
      </div>

      {/* Main Split Layout: Left File Tree, Right Code Preview */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Tree Explorer */}
        <div className="w-64 bg-slate-50 border-r border-slate-200 p-3 overflow-y-auto space-y-3 shrink-0">
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-2">
              Thư mục dự án
            </span>
            <div className="mt-1 space-y-0.5">
              <div className="flex items-center gap-2 px-2 py-1.5 text-xs font-semibold text-slate-700">
                <Folder size={14} className="text-amber-500" /> app_tam_ly_khkt
              </div>

              {/* Subfolders & Files */}
              <div className="pl-4 space-y-0.5 border-l border-slate-200 ml-3">
                {FLUTTER_PROJECT_FILES.map((file) => {
                  const isSelected = selectedFile.path === file.path;
                  return (
                    <button
                      key={file.path}
                      onClick={() => setSelectedFile(file)}
                      className={`w-full text-left flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs transition-colors ${
                        isSelected
                          ? 'bg-blue-100/80 text-blue-900 font-bold'
                          : 'text-slate-600 hover:bg-slate-200/60'
                      }`}
                    >
                      {file.name.endsWith('.yaml') ? (
                        <Layers size={13} className="text-purple-500 shrink-0" />
                      ) : file.name.endsWith('.md') ? (
                        <FileText size={13} className="text-slate-500 shrink-0" />
                      ) : (
                        <FileCode size={13} className="text-blue-500 shrink-0" />
                      )}
                      <span className="truncate">{file.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Quick CLI info */}
          <div className="p-3 bg-white rounded-xl border border-slate-200 text-[11px] space-y-1.5 text-slate-600">
            <span className="font-bold text-slate-800 flex items-center gap-1.5">
              <Terminal size={12} className="text-emerald-600" /> Lệnh chạy nhanh:
            </span>
            <code className="block bg-slate-900 text-emerald-300 font-mono text-[10px] p-2 rounded-md">
              flutter pub get<br />
              flutter run
            </code>
          </div>
        </div>

        {/* Right Code Display */}
        <div className="flex-1 flex flex-col bg-slate-950 text-slate-200 overflow-hidden">
          {/* File Tab Info Bar */}
          <div className="px-4 py-2 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span className="font-mono text-emerald-400 font-semibold">{selectedFile.path}</span>
              <span className="text-slate-500">·</span>
              <span className="text-slate-400 text-[11px] truncate max-w-sm">{selectedFile.description}</span>
            </div>
            <span className="text-[10px] font-mono text-slate-500 uppercase">
              {selectedFile.code.split('\n').length} dòng
            </span>
          </div>

          {/* Code Body */}
          <div className="flex-1 overflow-auto p-4 font-mono text-xs leading-relaxed text-slate-200 selection:bg-blue-500/30">
            <pre className="tab-4">
              <code>{selectedFile.code}</code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};
