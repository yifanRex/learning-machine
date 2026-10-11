# Context and privacy

Learning Machine is a set of instructions, not a hosted service. It contains no telemetry, account system, network client, or model training pipeline.

It asks the host model to maintain a session Brief. Depending on the host, that Brief may exist in conversation, a local file, or the host's artifact storage. The host and model provider control storage, retention, tool access, and data handling. This project cannot override those policies.

The protocol instructs the model not to automatically discover or load old Briefs or personal history. That instruction does not disable a host's built-in memory or context injection. If strict isolation matters, also configure the host appropriately and use a fresh session.

Saved Briefs may remain after a session. To reuse one, explicitly provide or designate it. To remove sensitive content, ask to remove it from the active Brief and use the host's controls for files and conversation history. Removing text from a Brief does not guarantee deletion from provider logs, backups, or earlier file versions.

Keep Briefs outside the installed skill and outside public source control. The repository ignores the default `.learning-machine/` directory, but it cannot protect files stored elsewhere. Never contribute credentials, personal account details, or unredacted private transcripts.
