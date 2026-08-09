---
title: Commands
description: Useful CoziCraft and Towny commands for everyday play.
category: Commands
order: 3
tags:
  - commands
  - help
  - towny
---

# Commands

CoziCraft uses Towny for towns and protected land. This guide covers the commands that most players need.

Towny command costs and permissions can depend on the server settings. Use `/towny prices` to see current costs. Add `?` after a command to see its in-game help, such as `/town claim ?`.

## Find Your Way

- `/towny` shows basic Towny help.
- `/towny map` shows the Towny map around you.
- `/town here` shows information about the town where you stand.
- `/town nearby` lists nearby towns.
- `/town list by open` lists open towns first.
- `/resident` shows your resident information, town, and plots.

## Join A Town

- `/invite list` shows your town invitations.
- `/invite accept <town>` joins a town that invited you.
- `/invite deny <town>` declines an invitation.
- `/town spawn` takes you to your town spawn.
- `/town leave` leaves your current town. Move your items first and confirm that you want to leave.

## Start And Grow A Town

These commands are for mayors or town members with the required rank.

- `/town new <name>` creates a town where you stand.
- `/town deposit <amount>` moves money into the town bank.
- `/town invite <player>` invites a player to your town.
- `/town claim` adds the townblock where you stand to your town.
- `/town claim auto` claims as much nearby land as your town can afford and hold.
- `/town set homeblock` moves the town homeblock to your current townblock.
- `/town set spawn` sets the town spawn inside the homeblock.
- `/town set board <message>` sets the message that members see when they join.

## Plots And Protection

- `/plot` shows the plot commands that you can use.
- `/plot claim` buys the for-sale plot where you stand.
- `/plot unclaim` gives up your personal plot.
- `/resident plotlist` lists your plots.
- `/resident toggle plotborder` shows plot borders when you cross them.
- `/plot perm` shows the permissions for your current plot.
- `/plot perm gui` opens the plot permission menu.
- `/plot trust add <player>` lets a player work on your current plot.
- `/plot trust remove <player>` removes that trust.

Read [Towns and Claims](/wiki/claims) before you change land or plot permissions.

## More Towny Help

The [official Towny command reference](https://github.com/TownyAdvanced/Towny/wiki/Towny-Commands) has the complete command list. CoziCraft can limit commands by rank or server settings, so the in-game help is the final source for what you can use.
