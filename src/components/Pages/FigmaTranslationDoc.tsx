import React from 'react';
import { FIGMA_COMPONENT_BREAKDOWN } from '../../data/figmaGuideData';
import { Layers, Code2, Palette, FileCode2, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';

export const FigmaTranslationDoc: React.FC = () => {
  return (
    <div className="bg-stone-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-stone-200 shadow-md text-center max-w-4xl mx-auto space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full inline-block">
            Phase 2: Figma to Code Translation Strategy
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-stone-900 tracking-tight">
            Figma Breakdown & Component Architecture
          </h1>
          <p className="text-stone-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Detailed mapping of the uploaded wireframe screenshot ("KindnessKit" layout) to reusable Next.js / React components, Aceternity UI animations, Tailwind CSS utility classes, and NFCS content.
          </p>
        </div>

        {/* Section 1: Breakdown Table from Uploaded Image */}
        <div className="bg-white rounded-3xl p-8 border border-stone-200 shadow-xs space-y-6">
          <div className="flex items-center gap-3 border-b border-stone-100 pb-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-stone-900">Wireframe Layout Breakdown (Uploaded Image)</h2>
              <p className="text-xs text-stone-500">12 Sections identified from top header to bottom footer</p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-stone-100 text-stone-700 font-bold uppercase text-[10px] tracking-wider border-b border-stone-200">
                  <th className="p-3">Figma Section</th>
                  <th className="p-3">React Component</th>
                  <th className="p-3">Aceternity UI Suggestion</th>
                  <th className="p-3">Tailwind Utility Specs</th>
                  <th className="p-3">NFCS UNN Content Mapping</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 text-stone-700">
                {FIGMA_COMPONENT_BREAKDOWN.map((item, idx) => (
                  <tr key={idx} className="hover:bg-stone-50 transition-colors">
                    <td className="p-3 font-bold text-stone-900">{item.figmaSectionName}</td>
                    <td className="p-3 font-mono text-emerald-800 bg-emerald-50 rounded-md font-semibold">
                      {item.reactComponentName}
                    </td>
                    <td className="p-3 font-semibold text-purple-800 bg-purple-50 rounded-md">
                      {item.aceternityComponent}
                    </td>
                    <td className="p-3 font-mono text-[11px] text-stone-600 max-w-xs truncate">
                      {item.tailwindSpecs}
                    </td>
                    <td className="p-3 text-stone-600 max-w-xs leading-tight">
                      {item.nfcsContentMapping}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Section 2: Phase 2 Strategies */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Strategy 1: Component Breakdown Strategy */}
          <div className="bg-white p-8 rounded-3xl border border-stone-200 shadow-xs space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
              <Code2 className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-stone-900">1. Component Breakdown Strategy</h3>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              When analyzing a Figma wireframe for Next.js / React:
            </p>
            <ul className="text-xs text-stone-600 space-y-2 list-disc list-inside">
              <li><strong>Top-Down Hierarchy:</strong> Identify atomic sections (`Header`, `Hero`, `Footer`) as top-level components under `/src/components/`.</li>
              <li><strong>Repeatable Card Patterns:</strong> Extract 3-card, 4-card, and 6-card grids into dynamic map loops accepting TypeScript props.</li>
              <li><strong>Separation of Content & Presentational Code:</strong> Keep hardcoded copy, Mass times, and Exco lists in `src/data/nfcsData.ts`.</li>
            </ul>
          </div>

          {/* Strategy 2: Aceternity UI Integration */}
          <div className="bg-white p-8 rounded-3xl border border-stone-200 shadow-xs space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-800 flex items-center justify-center">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-stone-900">2. Aceternity UI Integration</h3>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              Recommended Aceternity UI components for each section:
            </p>
            <ul className="text-xs text-stone-600 space-y-2 list-disc list-inside">
              <li><strong>Hero Banner:</strong> `Aurora Background` + `Text Generate Effect` for headlines.</li>
              <li><strong>Key Pillars Grid:</strong> `Bento Grid` or `3D Card Effect` for physical card tilt on hover.</li>
              <li><strong>Testimonials:</strong> `Infinite Moving Cards` or `Animated Testimonials` with smooth spring physics.</li>
              <li><strong>Footer & CTAs:</strong> `Background Beams` or `Wavy Background` for spiritual atmosphere.</li>
            </ul>
          </div>

          {/* Strategy 3: Tailwind CSS Mapping Guide */}
          <div className="bg-white p-8 rounded-3xl border border-stone-200 shadow-xs space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center">
              <Palette className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-stone-900">3. Tailwind CSS Mapping Guide</h3>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              Converting Figma visual styles to Tailwind classes:
            </p>
            <ul className="text-xs text-stone-600 space-y-2 list-disc list-inside">
              <li><strong>Spacing (8px Grid):</strong> Figma `16px` = `p-4`, `24px` = `p-6`, `32px` = `p-8`, `48px` = `py-12`, `80px` = `py-20`.</li>
              <li><strong>Typography Scale:</strong> H1 (`text-4xl sm:text-5xl`), H2 (`text-2xl sm:text-4xl`), Body (`text-xs sm:text-sm`).</li>
              <li><strong>Nested Border Radius Formula:</strong> `Inner Radius = Outer Radius - Padding` (e.g. `rounded-3xl` container with `p-4` inner element = `rounded-2xl`).</li>
            </ul>
          </div>

          {/* Strategy 4: Content Injection Strategy */}
          <div className="bg-white p-8 rounded-3xl border border-stone-200 shadow-xs space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-800 flex items-center justify-center">
              <FileCode2 className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-stone-900">4. Content Injection Strategy</h3>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              Plugging Phase 1 generated copy into frontend components:
            </p>
            <ul className="text-xs text-stone-600 space-y-2 list-disc list-inside">
              <li><strong>TypeScript Data Structures:</strong> Strongly typed interfaces in `src/types.ts` (`MassSchedule`, `ExcoMember`, `PiousSociety`, `BlogPost`).</li>
              <li><strong>Centralized Constants File:</strong> `src/data/nfcsData.ts` holds all text strings, Mass times, and placeholders like `[Insert Name]`.</li>
              <li><strong>Clean JSX Consumption:</strong> Components loop over arrays using <code className="bg-stone-100 px-1 py-0.5 rounded text-stone-800">.map((item) =&gt; ...)</code> with zero hardcoded duplication.</li>
            </ul>
          </div>

        </div>

      </div>
    </div>
  );
};
