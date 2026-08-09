---
title: Towns and Claims
description: Use Towny to protect builds, manage plots, and share land safely.
category: Claims
order: 4
tags:
  - claims
  - land
  - builds
  - towny
---

# Towns And Claims

Towny protects land in square townblocks. A town owns its claimed townblocks. A mayor can keep a townblock for the town or offer a plot inside it to a resident.

## Before You Claim

1. Use `/towny map` to see nearby townblocks.
2. Use `/town here` to check the land where you stand.
3. Leave space around other towns and active builds.
4. Check `/towny prices` before you spend town money.

## Claim Land For A Town

You must be the mayor or have a town rank that can claim land.

- Stand in the land that you want to add.
- Use `/town claim` to claim the current townblock.
- Use `/town claim auto` only when you want to claim several nearby townblocks.
- Use `/town unclaim` to remove the current townblock from your town.

Check the map after each change. Unclaimed land is no longer protected by your town.

## Give A Plot To A Resident

1. The mayor stands in a town-owned plot and uses `/plot forsale <price>`.
2. The resident stands in that plot and uses `/plot claim`.
3. The resident uses `/plot perm` to review its protection.

Use `/plot notforsale` to remove a town-owned plot from sale. Use `/plot unclaim` to give up a personal plot.

## Share A Plot Safely

- `/plot trust add <player>` gives one player access to the plot where you stand.
- `/plot trust remove <player>` removes that access.
- `/plot perm gui` opens the permission menu.
- `/plot set perm outsider off` blocks all outsider actions on the current plot.
- `/plot set perm outsider switch on` lets outsiders use switches without letting them build.
- `/plot set perm reset` restores the current plot to its town or resident defaults.

Trust only players who need access. Check the plot after you change a permission.

## Town-Wide Protection

Mayors can use `/town set perm` to set the default protection for town-owned plots. A town-wide change can affect many builds. Use `/town set perm ?` to read the in-game options before you apply one.

The [official Towny land guide](https://github.com/TownyAdvanced/Towny/wiki/How-Towny-Works) explains the full permission system.
