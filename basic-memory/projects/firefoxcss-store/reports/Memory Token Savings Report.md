---
title: Memory Token Savings Report
type: report
permalink: firefoxcss-store/projects/firefoxcss-store/reports/memory-token-savings-report
tags:
- firefoxcss-store
- basic-memory
- tokens
- report
---

# Memory Token Savings Report

A visual report was created at `reports/memory-token-savings.html` to explain the context and token savings from moving repository memory from `MEMORY.md` to the repository-backed Basic Memory project.

The report compares the old session-context reconstruction flow against the new Basic Memory flow. It highlights the 84.2% reduction in minimum initial context, the 63.8% reduction when loading the project overview, and the trade-off that a broader selective context can be slightly larger while being more structured and relevant.

## Observations
- [artifact] The visual report lives at `reports/memory-token-savings.html` #report
- [metric] Old startup loaded about 2,523 estimated tokens from `AGENTS.md` and `MEMORY.md` #tokens
- [metric] New minimum startup loads about 399 estimated tokens from `AGENTS.md` #tokens
- [metric] Minimum startup saves about 2,124 tokens, or 84.2% #tokens
- [metric] Startup with the project overview loads about 913 estimated tokens #tokens
- [metric] Startup with the project overview saves about 1,610 tokens, or 63.8% #tokens
- [metric] Total repository-backed Basic Memory content is about 9,985 estimated tokens #tokens
- [message] Basic Memory increases available documented knowledge while reducing default context load #basic-memory
- [clarification] The report now says savings apply when opening a new work session or reconstructing initial project context, not to the literal text of every user message #tokens
- [metric] Avoiding the old monolithic memory saves about 2,124 input tokens per subsequent turn when only the new minimal context is needed #tokens
- [metric] Avoiding the old monolithic memory saves about 1,610 input tokens per subsequent turn when the project overview is also loaded #tokens
- [metric] A 10-exchange conversation can avoid about 21,240 input tokens in the minimal-context scenario, before provider-specific prompt caching effects #tokens

## Relations
- explains [[Basic Memory Migration Record]]
- relates_to [[Project Working Agreement]]
- relates_to [[FirefoxCSS Store Project Overview]]
