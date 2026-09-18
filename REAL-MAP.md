# Homepage map

The homepage renders 277 actual SONAR Producer sample positions from
`docs/producer/c4_1_0_evidence/results/real-umap-3d-coordinates.npz`.
Positions are centered and uniformly scaled; shape and relative distances are preserved.
Colors denote the ten sample types present in the source, not invented music genres.
Only positions and sound types are exported. Names are anonymized; no audio,
original asset IDs, filenames or local paths are included.

Website MATCHES displays nearest neighbors in this 3D projection (4–20 neighbors).
It does not call the application's audio similarity service. FOCUS isolates that
selection. SET FLOW connects user-selected samples in their chosen order.
The controls follow the desktop SelectionActions component's arrangement and icons.

This is a real Producer analysis dataset, not a real DJ track library. The page
labels it accordingly. Other marketing previews retain demonstration data.
