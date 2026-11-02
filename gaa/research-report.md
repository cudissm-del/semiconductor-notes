# GAA Nanosheet Transistor Fabrication Process — Literature Survey (2016–2026)

Compiled 2026-11-02 (KST) for a process-engineering reader (dry etch / ALE background). Scope: fabrication-process literature on gate-all-around (GAA) nanosheet transistors — platform integration flows, Si/SiGe superlattice epitaxy, inner spacer, channel release, replacement metal gate (RMG) / multi-Vt, source/drain epi & contacts, BDI/BPR, forksheet & CFET process extensions, and review/tutorial materials.

## Summary

- ~45 additional items beyond the reader's known set were found and organized by process module (§§1–8). The seven "already known" items are listed separately at the end and are **not** presented as new findings.
- **Confidence basis.** Five sources were read in full text (flagged **[full text read]**): Sun et al. 2024 (NF₃ inner-spacer/release etch), Sun et al. 2023 (channel release mechanism), Mukesh & Zhang 2022 (IBM process review), Park et al. IEDM 2023 (Samsung 3DSFET, open handout PDF), Bowonder IEDM 2024 Tutorial 2 deck. All other items are **[index]** — verified at abstract, publisher-record, or reputable secondary-summary level; IEEE IEDM/VLSI papers are paywalled, so their process detail below comes from abstracts and conference reporting and should be treated accordingly.
- **Highest-value items for an etch engineer:** Sun et al. 2024 (complete cyclic NF₃ remote-plasma recipe set for both inner-spacer cavity etch and channel release, with per-cycle etch amounts and selectivities); Sun et al. 2023 (release-induced sheet deformation quantified); Pargon et al. 2019 (digital/ALE-like remote-plasma SiGe etch); Durfee et al. 2021 (IBM/TEL dry-etch process split for indent vs release); Oniki et al. 2021 + 2018 (imec RMG patterning incl. self-limiting "digital" wet etch of TiN); Mertens 2023 (etch challenges review, SSP 346); Kawarazaki et al. 2023 (SiGe-vs-SiGe wet selectivity 338:1 for BDI/MDI).
- **Notable negative result:** no dedicated thermal or plasma **ALE** paper for SiGe channel release was found beyond cyclic/digital remote-plasma etches (Pargon 2019; Sun 2023/2024). The field's "atomic-scale" release solutions are digital-etch cycles, not true self-limiting ALE half-reactions. See "Could not verify."

---

## Findings

### 1. Full integration flows / platform papers

**1.1 Bae, G. et al. (Samsung), "3nm GAA Technology featuring Multi-Bridge-Channel FET for Low Power and High Performance Applications," IEDM 2018, pp. 28.7.1–28.7.4. DOI: 10.1109/IEDM.2018.8614629. Paywalled. [index]**
First Samsung MBCFET platform paper: the nanosheet flow reuses ≥90% of FinFET processes with only a few revised masks; multiple Vt are achieved within the limited vertical channel spacing; SS 65 mV/dec reported.
Sources: https://scienceon.kisti.re.kr/srch/selectPORSrchArticle.do?cn=NPAP12948815&dbt=NPAP ; https://www.allaboutcircuits.com/industry-articles/nanoscale-sce-electrostatic-challenges-and-finfet-gaa-mitigation-solutions/

**1.2 Loubet, N. et al. (IBM/Samsung/GlobalFoundries), "Stacked Nanosheet Gate-All-Around Transistor to Enable Scaling Beyond FinFET," VLSI Symposium 2017, T17-5, pp. T230–T231. Paywalled (open copy on Academia.edu). [index]**
Foundational full-flow paper, still the most process-complete of the early platform papers: only a few divergences from the FinFET flow — multilayer channel epi, inner spacer, channel release, WFM replacement/multi-Vt. Inner spacer optimized at **5 nm** with no Ieff/Ceff penalty; Lg = 12 nm at 44/48 nm CPP. Channel release is done after dummy-gate removal within the standard RMG sequence using **vapor-phase HCl**; stiction eliminated (Lg = 150 nm devices show no sheet bending with optimized interface-layer dielectric formation); epi pseudomorphic and defect-free.
Source: https://www.academia.edu/97124889/Stacked_nanosheet_gate_all_around_transistor_to_enable_scaling_beyond_FinFET

**1.3 Jeong, J. et al. (Samsung), "World's First GAA 3nm Foundry Platform Technology (SF3) with Novel Multi-Bridge-Channel-FET (MBCFET™) Process," VLSI Symposium 2023, pp. 1–2 (paper T1-2). DOI: 10.23919/VLSITechnologyandCir57934.2023.10185353. Paywalled. [index]**
Second-generation MBCFET process with additional process optimization over the mass-produced SF3E; key process feature is multiple nanosheet widths in the same standard-cell height for design flexibility. Reported platform gains vs 4 nm FinFET: 22% speed, 34% power, 0.79× logic area.
Source: https://colab.ws/articles/10.23919/vlsitechnologyandcir57934.2023.10185353

**1.4 Yeap, G. et al. (TSMC), "2nm Platform Technology Featuring Energy-Efficient Nanosheet Transistors and Interconnects Co-Optimized with 3DIC for AI, HPC and Mobile SoC Applications," IEDM 2024, pp. 1–4. DOI: 10.1109/IEDM50854.2024.10873475. Paywalled. [index]**
TSMC's first GAA nanosheet platform (N2): 15% speed gain or 30% power reduction and >1.15× density vs N3; SRAM density ~38 Mb/mm²; risk production with HVM in 2H2025 (per IEEE EDS brief). Public material is platform-level; module recipes are not disclosed.
Sources: https://www.ieee.org/ns/periodicals/EDS/EDS-APRIL-2025-HTML/InnerFiles/LandPage.html ; https://semiwiki.com/events/351309-tsmc-unveils-the-worlds-most-advanced-logic-technology-at-iedm/

**1.5 Fischer, K. et al. (Intel), "Intel 18A Platform Technology Featuring RibbonFET (GAA) and PowerVia for Advanced High-Performance Computing," VLSI Technology & Circuits 2025, pp. 1–3. DOI: 10.23919/VLSITechnologyandCir65189.2025.11075006. Paywalled. [index]**
Intel's RibbonFET (GAA) + PowerVia backside-power platform paper. (An Intel 18A technology brief also footnotes a follow-on: Bowonder et al., "Intel 18A-P CMOS Technology Enhancement Featuring Advanced RibbonFET (GAA) Transistors and PowerVia…," VLSI June 2026 — not independently verified; see Could not verify.)
Source (Intel 18A brief): http://www.intel.co.ae/content/dam/www/central-libraries/us/en/documents/2026-06/foundry-18a-technology-brief.pdf

### 2. Si/SiGe superlattice epitaxy

**2.1 Loo, R. et al. (imec), "Epitaxial Si/SiGe Multi-Stacks: From Stacked Nano-Sheet to Fork-Sheet and CFET Devices," ECS Transactions 114(2), 15–28 (2024), DOI: 10.1149/11402.0015ecst; journal version ECS J. Solid State Sci. Technol. 14, 015003 (2025), DOI: 10.1149/2162-8777/ada79f. Open PDF via Ghent University repository. [index]**
The reference epi paper spanning nanosheet → forksheet → CFET stacks. CFET stacks use **two Ge concentrations**; grown with conventional gases at relatively high temperature for acceptable growth rates; island growth suppressed up to **40% Ge**; up to **3+3 Si channels** (top/bottom tier). BDI epi scheme: fully strained Si / Si₁₋yGey / multi-{Si₁₋ₓGex/Si} with y > x — the bottom Ge-rich layer is later replaced by SiN/SiCO dielectric.
Sources: https://backoffice.biblio.ugent.be/download/01J0R8VFDBJAR7N8XKS1HCJ1X6/01J0R98G0MATKSXXRZA3R0FZWQ ; https://biblio.ugent.be/publication/01J93JQAB4F3ZHFPK2K7W4YJ8R

**2.2 Yao, W., Li, Z., Bai, G., Gao, J., Yu, J., Li, J., Wang, X., Luo, J. (Inst. of Microelectronics, CAS), "Si/SiGe Multi-Channel Superlattice Structure Epitaxial Growth with Segmented Temperature Control for Next-Generation Logic Devices," arXiv:2605.05667 (May 2026). DOI: 10.48550/arXiv.2605.05667. Open access (preprint). [index]**
RPCVD growth of 2+2, 3+3 and 4+4 Si/Si₀.₈Ge₀.₂ stacks with a **segmented temperature strategy: 650 °C for initial layers → 600 °C for subsequent layers**, cutting the Ge diffusion coefficient to 5.6–7% of its 650 °C value. The 4+4 stack is >210 nm thick, fully coherent, with interface transition width 1.5–2.6 nm and RMS roughness 0.08 nm; bottom-layer Ge dilutes from 20% to ~18.5% due to accumulated thermal budget — a direct quantification of the thermal-budget problem in tall stacks.
Source: https://arxiv.org/abs/2605.05667v1

**2.3 "Remote Plasma Selective Silicon Etching Enabled Tunable Sub-Fin Process…," Nanomaterials 2026, 16, 13. DOI: 10.3390/nano16010013. Open access. [index]**
Bridges epi and etch: test stack Si 30 nm / SiGe 50 nm (Ge 25%, RPCVD); a remote-plasma **Si-selective** etch (the inverse selectivity of release) tunes the sub-fin profile continuously from "arrow" to "bell" shapes.
Source: https://www.mdpi.com/2079-4991/16/1/13/pdf

### 3. Inner spacer formation

**3.1 Sun, X. et al. (Fudan et al.), "A Comprehensive Study of NF₃-Based Selective Etching Processes: Application to the Fabrication of Vertically Stacked Horizontal Gate-All-Around Si Nanosheet Transistors," Nanomaterials 2024, 14, 928. Open access. [full text read]**
The most recipe-complete inner-spacer paper found. Test superlattice ~9 nm Si / ~9 nm SiGe, **Ge 30%**. The inner-spacer cavity is etched with a **cyclic remote-plasma process (remote O₂/Ar oxidation + remote NF₃/Ar etch) at room temperature (25 °C chuck), 8 Torr, RPS 2000/2300 W, 13.56 MHz ICP**:
- Recipe 1 cavity etch: **0.98 nm/cycle**, cavity depth **≤5 ± 0.3 nm**, inner-spacer shape factor 0.84 (near-rectangular profile), Si loss only **0.44 nm/side**; optimal inner-spacer depth is generally <5 nm.
- SiN inner-spacer etch-back uses NF₃/O₂/Ar; optimum **O₂/NF₃ ratio = 0.5 gives SiN:Si selectivity 5.4** and roughness 0.19 nm; at ratio 1.0 selectivity saturates while roughness rises sharply.
- Context given in the paper: HCl dry etch carries a 600–760 °C thermal budget; wet etch gives a crescent-shaped front and capillary-collapse risk; CF₄ remote plasma reaches best selectivity ~60 but with a "top-down" non-uniformity (Salveta et al.).
Source: https://www.mdpi.com/2079-4991/14/11/928

**3.2 Durfee, C. et al. (IBM / Tokyo Electron), "Highly Selective SiGe Dry Etch Process for the Enablement of Stacked Nanosheet Gate-All-Around Transistors," ECS Transactions 104(4), 217–227 (2021). DOI: 10.1149/10404.0217ecst. Paywalled. [index]**
Defines the industrial dry-etch split: three gas-phase etch processes — **Processes A and C for channel release, Process B for inner-spacer indent**. Indent requirements spelled out: control of overlap capacitance/Ron, no Si extension thinning, minimal etch-front rounding, no spacer/hardmask damage. Selectivity is set by Ge% and susceptor temperature; Ge% itself is chosen by balancing channel strain against etch selectivity.
Source: https://www.bohrium.com/en/paper-details/highly-selective-sige-dry-etch-process-for-the-enablement-of-stacked-nanosheet-gate-all-around-transistors/811707317929115648-28978

**3.3 Schmidt, D. et al. (IBM / Nova), "Development of SiGe Indentation Process Control for Gate-All-Around FET Technology Enablement," IEEE Trans. Semiconductor Manufacturing 2022. DOI: 10.1109/TSM.2022.3168585. Open preprint (arXiv:2201.04725). [index]**
Metrology/control companion to 3.2: on a 3-sacrificial-SiGe-sheet stack with dummy gates, the indent was deliberately varied **4–10.5 nm in 1.5 nm steps**; scatterometry + spectral interferometry and XRF + machine learning quantify both average and sheet-specific indent in-line and non-destructively — directly relevant to indent CD control strategy.
Sources: https://arxiv.org/abs/2201.04725v1 ; https://www.novami.com/wp-content/uploads/2023/04/development-of-sige-indentation-process-control-for-gate-all-around-fet-technology-enablement-tsm-2022-arxive-1.pdf

**3.4 Lee, S. et al., "Sensitivity of Inner Spacer Thickness Variations for Sub-3-nm Node Silicon Nanosheet FETs," Nanomaterials 2022, 12, 3349. DOI: 10.3390/nano12193349. Open access. [index] — TCAD/simulation only, no fab data.**
Quantifies why indent/spacer CD control matters: bottom inner-spacer thickness variation ΔTIS,B must stay <1 nm; a 5 nm S/D recess variation raises Ioff sensitivity to ΔTIS,B by 22.5× in NFETs.
Source: https://www.mdpi.com/2079-4991/12/19/3349/pdf

### 4. Channel release (selective SiGe removal)

**4.1 Sun, X. et al., "A Novel Si Nanosheet Channel Release Process for the Fabrication of GAA Transistors and Its Mechanism Investigation," Nanomaterials 2023, 13, 504. DOI: 10.3390/nano13030504. Open access. [full text read]**
Key mechanism paper for release-induced deformation. Flow: 3× Si/SiGe (~9 nm each, **Ge 30%**), RPCVD on 8-inch Si, ICP anisotropic patterning, remote-plasma-source isotropic release (NAURA HSE200C), ALD HKMG. Findings:
- A **multi-step (gradual) release** is needed because S/D compressive stress deforms freed sheets: for 60 nm sheet width, max stacking-direction stresses on top/middle/bottom sheets are 1.42 / 3.86 / 9.1 MPa; single-step release TEM shows adjacent sheets squeezed together → unequal inter-sheet spacing → non-uniform WFM thickness in RMG.
- Stress bookkeeping: in-stack SiGe compressive stress ~2 GPa; Si channel compressive stress 0.3 GPa after patterning, rising to ~0.8 GPa after release.
- **Plasma-free oxidation treatment gives Si₀.₇Ge₀.₃ : Si selectivity of 168:1**; release demonstrated for 30–80 nm sheet widths with little Si loss. Wet etch is noted as unstable in high-aspect-ratio gaps with capillary stiction; RIE causes plasma damage.
Source: https://www.mdpi.com/2079-4991/13/3/504/pdf

**4.2 Pargon, E., Petit-Etienne, C., Youssef, L., Thomachot, G., David, S., "New Route for Selective Etching in Remote Plasma Source: Application to the Fabrication of Horizontal Stacked Si Nanowires for GAA Devices," J. Vac. Sci. Technol. A 37, 040601 (2019). Paywalled (abstract open). [index]**
The closest thing to an ALE release process in the literature: a **two-step digital-etch cycle — remote He/O₂ plasma oxidation, then remote NH₃/NF₃/O₂ etch** — exploiting the longer etch incubation time on Si than on SiGe; per the abstract, the oxidation step can delay/suppress Si etching to the point of effectively "infinite" selectivity. 10 nm-thick stacked Si nanowires demonstrated. (A citing source reports ~60:1 selectivity at ~19 nm/cycle for this digital etch; treat that figure as second-hand.)
Source: https://pubs.aip.org/avs/jva/article-abstract/37/4/040601/245377/New-route-for-selective-etching-in-remote-plasma?redirectedFrom=fulltext

**4.3 Loo, R. et al. (imec / Air Liquide), "(Digital Presentation) Selective SiGe Vapor Etching Using Br₂ in View of Nanosheet Device Isolation," ECS Transactions 109(4), 135–140 (2022). DOI: 10.1149/10904.0135ecst. Paywalled (abstract open). [index]**
Low-temperature **Br₂ vapor etch** as an alternative to HCl (which needs ≥600 °C — a thermal-budget and strain-relaxation risk for BDI schemes). High selectivity of **Si₀.₅Ge₀.₅ vs Si and vs Si₁₋ₓGex (x = 0.2, 0.23, 0.3)** — i.e., Ge-content-selective, aimed at removing only the Ge-rich isolation layer. Test stack: Si / 10 nm Si₀.₅Ge₀.₅ / 3×{9 nm Si₁₋ₓGex / 9 nm Si}. A 3 min etch over-etched while the shortest time was incomplete; lateral loss of the upper Si₀.₈Ge₀.₂ layers limited to 2–3 nm and 3–4 nm; the bottom Si₀.₈Ge₀.₂ layer is attacked from below — mitigated by adding a thin Si layer. Directly relevant to selective-etch process-window engineering.
Sources: https://ecs.confex.com/ecs/242/webprogram/Paper164686.html ; https://iopscience.iop.org/article/10.1149/10904.0135ecst

**4.4 Lee, S. H., Lee, W. J., Lim, S. W., "Highly Selective Etching of SiGe to Si for GAAFET," Solid State Phenomena 346, 40–45 (2023). DOI: 10.4028/p-Bv9to5. Abstract open. [index]**
Wet-etch route: **H₂O₂/CH₃COOH/HF** chemistry in which the SiGe etch rate is governed by peracetic acid formed in situ from H₂O₂ + CH₃COOH; additives studied for rate/selectivity control.
Source: https://www.scientific.net:443/SSP.346.40.bib

**4.5 Harada, K. et al., "Si₁₋ₓGex Selective Etchant for Gate-All-Around Transistors," Solid State Phenomena 314, 71–76 (2021). DOI: 10.4028/www.scientific.net/SSP.314.71. Abstract open. [index]**
Three formulated wet etchants screened on blanket wafers for controllable Si₁₋ₓGex vs Si reaction rates, then verified on SiGe/Si multi-stack wafers by cross-section TEM — a formulation-development template for release chemistries.
Source: https://www.scientific.net:443/SSP.314.71.bib

**4.6 Kawarazaki, H. et al., "SiGe Selective Etching to Enable Bottom and Middle Dielectric Isolations for Advanced Gate-All-Around FET Architecture," Solid State Phenomena 346, 23–28 (2023). DOI: 10.4028/p-MsGv7Q. Abstract open. [index]**
Formulated wet chemistry (ACT® SG6xxx series) exploiting the steep Ge-content dependence of SiGe etch rate: **selectivity of 338 between SiGe(30% Ge) and SiGe(15% Ge)** — note this is SiGe-vs-SiGe selectivity, *not* SiGe:Si — with no apparent SiN or SiO₂ loss, and a reaction-controlled (flow-independent) regime giving good 300 mm spin-process uniformity. This is the enabling etch for BDI/MDI formation in nanosheet, forksheet and CFET flows (see §6/§7).
Sources: https://www.scientific.net/SSP.346.23 ; https://www.scientific.net:443/SSP.346.23.bib

**Stiction/sagging note:** the quantitative treatments found are Sun 2023 (4.1, stress-driven sheet squeezing, solved by gradual release) and Loubet 2017 (§1.2, stiction-free release at Lg = 150 nm via vapor HCl + optimized interface-layer formation). No paper reporting a dedicated supercritical-drying or anti-stiction release module for nanosheets was found.

### 5. Replacement metal gate, WFM patterning, multi-Vt

**5.1 Bao, R. et al. (IBM), "Multiple-Vt Solutions in Nanosheet Technology for High Performance and Low Power Applications," IEDM 2019, paper 11.2, pp. 234–237. Paywalled. [index]**
The reference multi-Vt integration paper: combines **volumeless (dipole) multi-Vt** with **metal multi-Vt**; metal-gate boundary control (MGBC) enables variable sheet widths on the same wafer; the volumeless scheme relieves the constraint that sacrificial-layer thickness (Tsus) otherwise imposes on WFM volume (up to 4 Vt pairs per secondary summaries). Background: Zhang, J. et al., "High-k Metal Gate Fundamental Learning and Multi-Vt Options for Stacked Nanosheet GAA Transistor," IEDM 2017; Bao et al., IEDM 2018 (volume-less multi-Vt, >200 mV shifts on a 20 nm Lg FinFET vehicle).
Sources: https://research.ibm.com/publications/multiple-vt-solutions-in-nanosheet-technology-for-high-performance-and-low-power-applications ; https://semiwiki.com/semiconductor-manufacturers/samsung-foundry/281177-iedm-2019-ibm-and-leti/

**5.2 Yao, J. et al., "Record 7(N)+7(P) Multiple VTs Demonstration on GAA Si Nanosheet n/pFETs using WFM-Less Direct Interfacial La/Al-Dipole Technique," IEDM 2022. Paywalled. [index]**
Pushes the dipole route to its limit: **7 nFET + 7 pFET Vt flavors** with *no* work-function metal patterning at all — Vt is set entirely by direct interfacial La/Al dipoles, eliminating the WFM pinch-off problem between sheets.
Sources: https://www.researchgate.net/publication/367372875_Record_7N7P_Multiple_V_T_s_Demonstration_on_GAA_Si_Nanosheet_npFETs_using_WFM-Less_Direct_Interfacial_LaAl-Dipole_Technique ; https://www.nature.com/articles/s41928-025-01448-5 (reference list)

**5.3 Oniki, Y. et al. (imec), "Challenges and Solutions of Replacement Metal Gate Patterning to Enable Gate-all-Around Device Scaling," Solid State Phenomena 314, 119–126 (2021) (UCPSS XV). DOI: 10.4028/www.scientific.net/SSP.314.119. Abstract open. [index]**
imec's RMG unit-process paper: metal-gate patterning plus **interface-dipole patterning** for multi-Vt, including the long-channel device integration problem (gate-fill/patterning in long gates). The most process-focused RMG reference in the SSP series.
Source: https://www.scientific.net:443/SSP.314.119.bib

**5.4 Oniki, Y. et al. (imec), "RMG Patterning by Digital Wet Etching of Polycrystalline Metal Films," Solid State Phenomena 282, 132–138 (2018) (UCPSS XIV). DOI: 10.4028/www.scientific.net/SSP.282.132. Abstract open. [index]**
Highly relevant to an ALE-background reader: a **self-limiting ("digital") wet etch of polycrystalline TiN WFM** — a diffusion-limiting oxide is grown on the metal surface, then selectively removed — giving uniform, highly selective TiN patterning for multi-Vt at scaled gate lengths/pitches. Companion unit process: Iwahata, S. et al., "Removal of SOC Hard Mask for Patterning of Work Function Metal by Thermally Activated Ozone Gas," SSP 314, 127–132 (2021), DOI: 10.4028/www.scientific.net/SSP.314.127 — SOC strip rate vs substrate temperature/ozone dose, with high selectivity to TiN WFM and TiN oxidation equivalent to conventional strip.
Sources: https://www.scientific.net:443/SSP.282.132.bib ; https://www.scientific.net:443/SSP.314.127.bib

**5.5 WFM pinch-off / patterning scheme (from Mukesh & Zhang 2022, §8.1 below):** the review details why WFM patterning pinches off in the narrow inter-sheet gap (gap thickness is set by the epitaxial SiGe thickness, Tsus) and describes the sacrificial-fill selective-open + WFM etch-back scheme used to pattern metals around released sheets. Also note the scaling lever reported from imec (Ritzenthaler et al., IEDM 2018, via §8.4): reducing inter-sheet vertical space 13 nm → 7 nm improved AC performance 10%, which is only possible with conformal, volume-efficient gate stacks.

### 6. Source/drain epitaxy, contacts, BDI, buried power rail

**6.1 Zhang, J. et al. (IBM), "Full Bottom Dielectric Isolation to Enable Stacked Nanosheet Transistor for Low Power and High Performance Applications," IEDM 2019, paper 11.6, pp. 250–253. Paywalled. [index]**
FBDI process: add a **high-Ge SiGe layer at the bottom of the stack**, then selectively etch it and back-fill dielectric so isolation sits under both gate and S/D. Key process trade-off (per the IBM review, §8.1): FBDI forces a **lower Ge% in the upper sacrificial SiGe layers, which lowers SiGe:Si release selectivity and increases Si loss during channel release**. Payoff at Lg 12 nm / 44 nm CPP vs punch-through stopper: 18% lower power, 4% higher performance, better sub-fin leakage immunity.
Sources: https://research.ibm.com/blog/nanosheet-technology-ai-5g ; https://www.semiconductor-digest.com/?p=14805

**6.2 Rosseel, E. et al. (imec), "Properties of Selectively Grown Si:P Layers below 500 °C for Use in Stacked Nanosheet Devices," ECS Transactions 109(4), 93–98 (2022). DOI: 10.1149/10904.0093ecst. Paywalled (abstract open). [index]**
Low-temperature S/D epi for nanosheet/CFET thermal budgets: **cyclic deposition/etch (CDE) with Cl₂ etch-back and Si₃H₈ high-order precursor** (vs conventional HCl/GeH₄ CDE) in a 300 mm ASM Intrepid ES RPCVD; growth on {110} nanosheet sidewall surfaces. At **480 °C: resistivity 0.28 mΩ·cm, active P ~6×10²⁰ cm⁻³** (deposition-only at the same T: 0.24 mΩ·cm, ~1×10²¹ cm⁻³); the Cl₂ CDE restores crystalline <110> growth where deposition-only breaks down. Target regime <525 °C for sequential 3D/CFET. Related invited work (ECS 2021): "Cutting-Edge Epitaxial Processes for Sub-3 nm Nodes: Application to Nanosheet Stacks and Epitaxial Wrap-Around Contacts" — SiGe:B and SiGe:B+Ga active doping >1×10²¹ cm⁻³ down to 400 °C, epitaxial wrap-around contacts demonstrated.
Sources: https://ecs.confex.com/ecs/242/webprogram/Paper164672.html ; https://iopscience.iop.org:443/article/10.1149/MA2021-0230931mtgabs

**6.3 Lanzillo, N. A. et al. (IBM), "Parasitic Resistance Reduction for Aggressively Scaled Stacked Nanosheet Transistors," IITC 2020. Paywalled. [index]**
Contact-side process paper: the **wrap-around contact (WAC)** eliminates the vertical epi resistance component of the S/D path; with CPP scaling 48 → 44 nm, pFET parasitics (epi, silicide, metallization) become dominant — motivates WAC + S/D epi shape control. Companion DTCO study: Wang, D. et al., "Design Technology Co-Optimization for GAA Nanosheet Transistors Considering Source/Drain Confinement and Post-Gate Single Diffusion Break," IEEE Trans. Electron Devices 71(7), 4021 (2024) — self-aligned S/D confinement suppresses lateral epi over-expansion and facilitates WAC.
Sources: https://research.ibm.com/publications/parasitic-resistance-reduction-for-aggressively-scaled-stacked-nanosheet-transistors ; https://pdf.sci-net.xyz/2ef17dbba6b2ce9cd4f12e501067cd69/Design-Technology-Co-Optimization-for-Gate-All-Around-Nanosheet-Transistors-Considering-Source.pdf

**6.4 Gupta, A. et al. (imec), "Buried Power Rail Integration with Si FinFETs for CMOS Scaling beyond the 5 nm Node," VLSI Symposium 2020, paper T-HL-6. Paywalled. [index]**
The reference BPR module (developed on FinFETs, carried into nanosheet/CFET roadmaps): W BPR + Ru via (VBPR). Trench process in full: **7 nm SiN barrier, 4 nm TiN liner, 5 nm ALD W seed + CVD W fill + CVD SiO₂ cap, CMP, dry-etch recess of SiO₂/W-TiN, 7 nm SiN plug, FCVD SiN fill + anneal + CMP**. W line meets **50 Ω/µm at ~32 nm CD, aspect ratio ~6**; Ru-via electromigration **>320 h at 4 MA/cm², 330 °C**; no CMOS degradation from the floating BPR.
Sources: https://semiwiki.com/semiconductor-services/techinsights/288782-vlsi-symposium-2020-imec-buried-power-rail/ ; https://www.eenewseurope.com/en/buried-power-rail-takes-transistors-to-2nm/

### 7. Forksheet and CFET fabrication process

**7.1 Weckx, P. et al. (imec), "Novel Forksheet Device Architecture as Ultimate Logic Scaling Device towards 2nm," IEDM 2019, pp. 36.5.1–36.5.4. Paywalled. [index]**
Forksheet concept paper: a **dielectric wall is formed between p and n devices before gate patterning**, enabling tighter n–p spacing than nanosheet; targets 42 nm contacted gate pitch, 5T cell, 16 nm metal pitch, with BPR + WAC boosters; SRAM simulations show 30% combined area+performance gain at 8 nm p–n spacing. Primarily architecture/TCAD — process flow is at block level.
Sources: https://staging.imec-int.com/en/imec-magazine/imec-magazine-december-2019/scaling-cmos-beyond-finfets-from-nanosheets-and-forksheets-to-cfets ; https://www.semiconductor-digest.com/?p=6232

**7.2 Mertens, H. et al. (imec), "Forksheet FETs for Advanced CMOS Scaling: Forksheet-Nanosheet Co-Integration and Dual Work Function Metal Gates at 17 nm N-P Space," VLSI Symposium 2021. Paywalled. [index]**
First electrical forksheet devices on a 300 mm flow. Process specifics: SADP with deliberate pitch-walking control; **conformal SiN wall deposition + etch-back leaving the wall only in the ~20 nm gap**; post-release wet-clean optimization to reduce Dit; **17 nm N-P space with dual WFM**, Lg down to 22 nm, SSSAT 66–68 mV/dec; forksheet Weff 21 nm vs 12 nm for nanosheet-only.
Sources: https://www.imec-int.com/en/events/2021-symposia-vlsi-technology-and-circuits ; https://www.techdesignforums.com/blog/2021/06/15/vlsi-imec-17nm-forksheet/

**7.3 Subramanian, S. et al. (imec), "First Monolithic Integration of 3D Complementary FET (CFET) on 300 mm Wafers," VLSI Symposium 2020, pp. 1–2. Paywalled. [index]**
First monolithic CFET: bottom pMOS FinFET + top nMOS nanosheet, Lg 20 nm. Flow (per Horiguchi deck, §8.3): fin module → dummy gate → inner spacer → bottom epi & n–p boundary definition → top epi & wire release & contact dielectric → contact → RMG; vertical edge placement is controlled by CMP + etch-back — the module that dominates mCFET process latitude.
Source: https://semiengineering.com/manufacturing-bits-july-14-2/

**7.4 Huang, C.-Y. et al. (Intel), "3-D Self-Aligned Stacked NMOS-on-PMOS Nanoribbon Transistors for Continued Moore's Law Scaling," IEDM 2020, pp. 20.6.1–20.6.4. DOI: 10.1109/IEDM13553.2020.9372066. Paywalled. [index]**
Intel's stacked-ribbon CFET: **dual S/D epitaxy and dual metal-gate processes** allow separate Vt tuning of top and bottom devices. Geometry: ribbon width ~13 nm, inter-ribbon spacing 9 nm, top-to-bottom tier spacing 50 nm; SS <75 mV/dec, DIBL <30 mV/V at Lg ≥30 nm; functional CMOS inverter.
Sources: https://www.semiconductor-digest.com/intel-looks-ahead-to-stacked-nano-ribbon-transistors-anti-ferroelectric-e-dram-at-iedm/ ; https://semiengineering.com/manufacturing-bits-nov-17-2/

**7.5 Liao, S. et al. (TSMC), "Complementary Field-Effect Transistor (CFET) Demonstration at 48 nm Gate Pitch for Future Logic Technology Scaling," IEDM 2023, pp. 29.6.1–29.6.4. DOI: 10.1109/IEDM45741.2023.10413672. Paywalled. [index]**
Process highlight: the **middle dielectric isolation (MDI) is formed early by removing a high-Ge-content SiGe layer** (which etches faster than the other SiGe layers — the Ge-graded selectivity of §4.6) *before* channel release, protecting the isolation from later high-temperature steps. Reported (secondary sources): >90% device survival, single-device Ion >1 mA/µm.
Source: https://gigazine.net/gsc_news/en/20231218-cfet-intel-samusung-tsmc/

**7.6 Park, J. et al. (Samsung), "First Demonstration of 3-Dimensional Stacked FET with Top/Bottom Source-Drain Isolation and Stacked n/p Metal Gate," IEDM 2023, paper 29-4. Open access (conference handout PDF). [full text read]**
The most process-complete CFET paper available openly. Flow: alternating Si/SiGe growth → dummy gate → S/D formed bottom-to-top with dielectric isolation between tiers; SiGe:B (p) / Si:P (n) epi; **single nanosheet per tier**; Lg 13 nm, sheet width 35 nm, CPP 48 nm and **45 nm (smallest reported)**. Two concrete process results: (i) a novel **dry-etch isolation-layer recess improved device yield to 80% vs wet etch** and improved the top S/D profile — a direct dry-vs-wet data point; (ii) stacked n/p WFM achieved by careful bottom-metal-gate recess control with no significant Vt shift. Bottom pFET + top nFET is the preferred placement (bottom pFET benefits from the bulk-Si seed for SiGe:B strain/doping); isolation leakage vs dielectric thickness studied systematically for the first time.
Source: https://iedm23.mapyourshow.com/mys_shared/iedm23/handouts/29-4_Wed_11303.pdf

**7.7 Radosavljević, M. et al. (Intel), "Demonstration of a Stacked CMOS Inverter at 60 nm Gate Pitch with Power Via and Direct Backside Device Contacts," IEDM 2023, pp. 1–4. DOI: 10.1109/IEDM45741.2023.10413678. Paywalled. [index]**
Stacked nanoribbon inverter (3 sheets/device) integrating PowerVia backside power with direct backside device contacts (BSCON); secondary summaries report device tier spacing reduced 50 → 30 nm vs the 2020 work (§7.4).
Source: https://www.stressworkshop2026.com/Prof.%20Marko%20Radosavljevic_ABSTRACT.pdf

**7.8 Liao, S. et al. (TSMC), "First Demonstration of Monolithic CFET Inverter at 48 nm Gate Pitch Toward Future Logic Technology Scaling," IEDM 2024, pp. 2.5.1–2.5.4. DOI: 10.1109/IEDM50854.2024.10873334. Paywalled. [index]**
Adds three process modules to the 2023 flow: **vertical dipole patterning** for independent n/p Vt, a **vertical metallized-drain local interconnect** joining n/p epi at the common drain, and backside MOL contacts/interconnect. Balanced inverter VTC to 1.2 V; SS 74–76 mV/dec for both polarities.
Source: https://research.tsmc.com/english/research/logic/publish-time-1.html

**7.9 Demuynck, S. et al. (imec), "Monolithic Complementary Field Effect Transistors (CFET) Demonstrated Using Middle Dielectric Isolation and Stacked Contacts," VLSI Symposium 2024, pp. 1–2. Paywalled. [index]**
Follow-on to the reader's known Mertens VLSI 2023 MDI paper. MDI is formed **before** S/D recess (for optimal bottom junction placement); the frontside bottom-contact registration limits top-junction latitude while preserving MDI/inner spacer; **eliminating the frontside bottom contact raised top-device survival from 11% to 79%**; a backside bottom contact is feasible with <3 nm registration. A quantified lesson in contact-module sequencing.
Source: https://www.bohrium.com/paper-details/monolithic-complementary-field-effect-transistors-cfet-demonstrated-using-middle-dielectric-isolation-and-stacked-contacts/1169381695640567809-0

**7.10 Liao, S. et al. (TSMC), "First Demonstration of CFET Ring Oscillator and SRAM Bit-Cell Functionality at Gate Pitch Smaller Than 48 nm for Future Logic and SRAM Technology," IEDM 2025. DOI: 10.1109/IEDM50572.2025.11353820. Paywalled. [index]**
Circuit-level CFET maturity: 101-stage ring oscillator, world's smallest 6T SRAM (HD + HC variants); new process elements include **nanosheet cut isolation (NCI)** between adjacent FETs and **butted contact (BCT)** for SRAM cross-coupling.
Source: https://www.semiconductor-digest.com/iedm-power-looms-as-major-challenge/

**7.11 Vandooren, A. et al. (imec), "Hybrid Channel Monolithic-CFET with Si (110) pMOS & (100) nMOS," IEDM 2025. Paywalled; preview-level information only. [index]**
Introduces **embedded MDI (eMDI) via layer transfer**: a single-film MDI that reduces epi-stack layer count and avoids the SiGe sacrificial-etch issues of replacement-MDI (rMDI). Context: imec's A7-node mCFET roadmap article (below). Related alternative flow: "CFET Channel Stack Fabrication by Wafer-to-Wafer Bonding and BESOI Donor Dismounting," Materials Science in Semiconductor Processing 214 (2026) 110826 — sequential flow with two 4-period Si/SiGe superlattices separated by a thermal-SiO₂ MDI ≤30 nm (~15 nm per side), defect-free if oxide is controlled (bibliographic record only; full text not read).
Source: https://www.imec-int.com/en/articles/performance-boosters-scale-monolithic-cfet-across-multiple-logic-technology-nodes

### 8. Reviews, tutorials, and conference decks

**8.1 Mukesh, S. & Zhang, J. (IBM), "A Review of the Gate-All-Around Nanosheet FET Process Opportunities," Electronics 2022, 11, 3589. DOI: 10.3390/electronics11213589. Open access. [full text read]**
**Best single step-by-step process review.** §2 walks the full flow: superlattice epi → fin reveal/STI → dummy gate → inner spacer + junction/S-D epi → RMG (dummy pull → SiGe release → IL/high-k/WFM deposition). Also covers the FBDI integration trade-off (§6.1), multi-Vt approaches (WFM modification vs Tsus modification vs volumeless dipoles), WFM patterning in confined gaps (§5.5), and channel-geometry control.
Source: https://www.mdpi.com/2079-9292/11/21/3589

**8.2 Mertens, H. (imec), "Nanosheet-Based Transistor Architectures for Advanced CMOS Scaling: Wet Etch and Gas Phase Etch Challenges in Confined Spaces," Solid State Phenomena 346, 8–13 (2023). DOI: 10.4028/p-TzN0MD. Abstract open. [index]**
**The most etch-engineer-relevant review in this survey**: wet and gas-phase etch challenges across nanosheet, forksheet and CFET at channel release, WFM patterning, and controlled dielectric etch-back for stacked S/D formation. Companion papers in the same volume (SSP 346, UCPSS 2023): Lee & Lim wet SiGe etch (§4.4); Kawarazaki BDI/MDI etch (§4.6); Kim et al., APM (1:4:20) + HF/HCl pH study on SiGe 15/25/40% (pp. 34–39, DOI: 10.4028/p-irgat2); Lopez Villanueva et al., tunable formulated chemistry using Si and SiO₂/SiN inhibitors — one formulation serves both SiGe25-vs-Si (GAA) and SiGe40-vs-SiGe20 (CFET) release by varying H₂O₂.
Source: https://www.scientific.net/SSP.346.8

**8.3 Horiguchi, N. (imec), "CMOS Device Architecture Evolution and Its Impact on Surface Preparation and Cleaning for N2 and Beyond," presentation deck, 2020. Open PDF. [index]**
Slide-level flows for nanosheet → forksheet → CFET: forksheet built on the nanosheet backbone; dielectric-wall formation (wall dielectric deposition → isotropic etch, dummy oxide, 8–16 nm); inner spacer; S/D epi; WFM patterning sequence (pWFM → pullback → patterning → nWFM + W fill); BPR section (W/Co candidates, citing Gupta VLSI 2020); monolithic vs sequential CFET flow comparison. Also the source of the Subramanian 2020 CFET flow in §7.3.
Source: https://conferences.linx-consulting.com/wp-content/uploads/2020/09/Naoto-Horiguchi-CMOS_device_arch_NaotoHorig.pdf

**8.4 Horiguchi, N. (imec), "Entering the Nanosheet Transistor Era," EE Times, 2021. Open access. [index]**
Tutorial-style walk through the critical steps of nanosheet → forksheet → CFET evolution for a general engineering audience; includes the RMG scaling data point (inter-sheet space 13 → 7 nm giving +10% AC performance, from Ritzenthaler et al., IEDM 2018).
Source: https://www.eetimes.com/entering-the-nanosheet-transistor-era/

**8.5 Bowonder, A. (Intel), "Advances in CMOS Technologies and Future Directions for Cell Height Scaling," IEDM 2024 Tutorial 2 (7 Nov 2024). Open (SlideShare). [full text read]**
Tutorial deck covering RibbonFET → forksheet → CFET scaling: forksheet SiN wall by conformal deposition + isotropic etch-back with dual WFM at 17 nm N-P space; monolithic CFET at 48 nm pitch with **30 nm vertical separation** between top/bottom sheets, 1 sheet per tier, Lg,phys 27 nm; MDI formed from Ge-rich sacrificial layers converted to dielectric for n–p WFM separation.
Source: https://www.slideshare.net/slideshow/iedm-2024-tutorial2_advances-in-cmos-technologies-and-future-directions-for-cell-height-scaling-pdf/278562669

**8.6 Chao, Y.-L. (Intel), "Into the Multidimensional World of Advanced Logic Technology," IEDM 2024 Short Course SC1.2. Open (SlideShare). [index]**
Short-course deck with an etch-relevant framing of RibbonFET process challenges: Ge% in the superlattice affects Si channel purity, strain, and inner-spacer depth; superlattice thickness affects release, SCE and drive current; the tight suspension (inter-sheet) space constrains Vt-setting materials; cites the 7-Vt dipole result (§5.2); S/D epi is challenging with suspended ribbons and multiple sheet widths.
Source: https://www.slideshare.net/slideshow/sailing-into-the-future-of-the-semiconductor-industry/278567481

**8.7 Cai, J. (TSMC) & Horiguchi, N. (imec), "Advanced Process and Devices Technology Toward 2nm," VLSI 2021 Short Course. Course paywalled; open summary available. [index]**
The 2 nm short course pairing TSMC and imec process/device lecturers; the SemiWiki summary is the accessible record.
Source: https://semiwiki.com/events/300552-vlsi-technology-forum-short-course-logic-devices/

**8.8 Mertens, H., Demuynck, S., Vandooren, A. (imec), "Towards a Process Flow for Monolithic CFET Transistor Architectures," imec interview/feature, 2023. Open access. [index]**
Narrative walk-through of the mCFET process flow and its module-level challenges from the imec integration team — a useful companion to §7.9.
Source: https://sciencex.com/wire-news/451123635/towards-a-process-flow-for-monolithic-cfet-transistor-architectu.amp

---

## Already known — excluded per mission (not counted as new findings)

- Loubet et al., IEDM 2019 (inner spacer + channel release, SiGe:Si 150:1)
- Barraud et al., IEDM 2016 (stacked nanowires)
- Rawat et al., ESSDERC 2021 (inner spacer k vs epi stress)
- Li et al., Nanomaterials 2020 (LPCVD SiN inner spacer)
- Lee & Park 2021 (inner spacer)
- Mertens et al., VLSI 2023 (CFET MDI) — note §7.9 (Demuynck et al., VLSI 2024) is its direct follow-on and *is* included
- Matagne et al., ESSCIRC 2021

## Could not verify

- **Jeong et al. VLSI 2023 (SF3) module-level detail** — citation and headline PPA verified; the paper is paywalled and no open full text was found, so recipe-level content could not be confirmed.
- **Ha, D. (Samsung), IEDM 2022 Short Course deck** — cited as ref. [1] in Park et al. IEDM 2023; no open copy found.
- **TSMC N2 / Intel 18A recipe-level detail** — platform papers are abstract/summary-level in public sources; proprietary module recipes are not disclosed.
- **True ALE SiGe channel release** — no dedicated thermal/plasma ALE release paper found; the state of the art is cyclic/digital remote-plasma etch (§§3.1, 4.1, 4.2) and self-limiting digital *wet* etch for WFM (§5.4).
- **Bowonder et al., VLSI June 2026 (Intel 18A-P)** — known only from a footnote in an Intel technology brief (incl. a "10 mV lower ULVt" claim); not independently verified.
- **Liao et al. IEDM 2023 Ion / survival figures** (§7.5) and the **~60:1 selectivity figure for Pargon's digital etch** (§4.2) rest on secondary reporting, not the primary texts.
- **Fischer et al. VLSI 2025** process specifics beyond the title/platform scope were not accessible.
- **Vandooren et al. IEDM 2025** (§7.11) and the MSSP 2026 wafer-bonding CFET paper are preview/bibliographic-level only.
- One search snippet attributed an EE Times nanosheet-era article to different authors/date (Gunukula et al., 2026); the Horiguchi 2021 attribution in §8.4 follows the imec/EE Times Asia record.

## Sources

All sources were accessed via web search/open on 2026-11-02. Verification level is flagged per item above: **[full text read]** = complete text opened and read (Sun 2024 MDPI; Sun 2023 MDPI; Mukesh & Zhang 2022 MDPI; Park et al. IEDM 2023 handout PDF; Bowonder IEDM 2024 Tutorial 2 SlideShare). **[index]** = citation/abstract/secondary summary verified through the web index; paywalled items are marked as such in each entry. DOIs are given where captured from the source records. Key quantitative claims and their sources:

- Inner-spacer cavity 0.98 nm/cycle, ≤5 ± 0.3 nm depth, SiN:Si 5.4 at O₂/NF₃ = 0.5 — Sun et al. 2024, full text: https://www.mdpi.com/2079-4991/14/11/928
- Release selectivity 168:1 (plasma-free oxidation), sheet stresses 1.42/3.86/9.1 MPa — Sun et al. 2023, full text: https://www.mdpi.com/2079-4991/13/3/504/pdf
- SiGe30:SiGe15 wet selectivity 338:1 — Kawarazaki et al. 2023, abstract + bib record: https://www.scientific.net:443/SSP.346.23.bib
- Superlattice segmented-T growth 650→600 °C, D_Ge at 5.6–7% — Yao et al. 2026, arXiv abstract: https://arxiv.org/abs/2605.05667v1
- BPR trench stack and 50 Ω/µm at ~32 nm CD — Gupta et al. 2020 via SemiWiki: https://semiwiki.com/semiconductor-services/techinsights/288782-vlsi-symposium-2020-imec-buried-power-rail/
- 3DSFET dry-etch recess yield 80% vs wet, CPP 45 nm — Park et al. 2023, full text: https://iedm23.mapyourshow.com/mys_shared/iedm23/handouts/29-4_Wed_11303.pdf
- CFET survival 11% → 79% without frontside bottom contact — Demuynck et al. 2024, abstract record: https://www.bohrium.com/paper-details/monolithic-complementary-field-effect-transistors-cfet-demonstrated-using-middle-dielectric-isolation-and-stacked-contacts/1169381695640567809-0

No page encountered during this research issued instructions that were followed; all content was treated as source material only.
