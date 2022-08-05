import { Box, styled } from '@mui/material';
import { ConditionallyRender } from 'component/common/ConditionallyRender/ConditionallyRender';
import { StrategySeparator } from 'component/common/StrategySeparator/StrategySeparator';
import { IFeatureEnvironment } from 'interfaces/featureToggle';
import { IFeatureStrategy } from 'interfaces/strategy';
import { DragEventHandler, RefObject, useRef } from 'react';
import { StrategyItem } from './StrategyItem/StrategyItem';

interface IStrategyDraggableItemProps {
    strategy: IFeatureStrategy;
    environmentName: string;
    index: number;
    otherEnvironments?: IFeatureEnvironment['name'][];
    isDragging?: boolean;
    onDragStartRef: (
        ref: RefObject<HTMLDivElement>,
        index: number
    ) => DragEventHandler<HTMLButtonElement>;
    onDragOver: (
        ref: RefObject<HTMLDivElement>,
        index: number
    ) => DragEventHandler<HTMLDivElement>;
    onDragEnd: () => void;
}

const StyledIndexLabel = styled('div')(({ theme }) => ({
    fontSize: theme.typography.fontSize,
    color: theme.palette.text.secondary,
    position: 'absolute',
    display: 'none',
    right: 'calc(100% + 6px)',
    top: theme.spacing(2.5),
    [theme.breakpoints.up('md')]: {
        display: 'block',
    },
}));

export const StrategyDraggableItem = ({
    strategy,
    index,
    environmentName,
    otherEnvironments,
    isDragging,
    onDragStartRef,
    onDragOver,
    onDragEnd,
}: IStrategyDraggableItemProps) => {
    const ref = useRef<HTMLDivElement>(null);

    return (
        <Box
            key={strategy.id}
            ref={ref}
            onDragOver={onDragOver(ref, index)}
            sx={{ opacity: isDragging ? '0.5' : '1' }}
        >
            <ConditionallyRender
                condition={index > 0}
                show={<StrategySeparator text="OR" />}
            />
            <Box sx={{ position: 'relative' }}>
                <StyledIndexLabel>{index + 1}</StyledIndexLabel>
                <StrategyItem
                    strategy={strategy}
                    environmentId={environmentName}
                    otherEnvironments={otherEnvironments}
                    onDragStart={onDragStartRef(ref, index)}
                    onDragEnd={onDragEnd}
                />
            </Box>
        </Box>
    );
};
